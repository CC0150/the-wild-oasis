import { SignJWT } from "jose";
import supabase from "./supabase";

const API_KEY = "2e4325c9989c4df79fcfb38c8d03fd9e.yEFDTMQ677xM4q1S";
const API_URL = "https://open.bigmodel.cn/api/paas/v4/chat/completions";

// 1. 定义具体的工具函数 (直接查询 Supabase)
const toolsImplementation = {
  // 查询所有小屋
  get_cabins: async () => {
    const { data, error } = await supabase.from("cabins").select("*");
    if (error) return JSON.stringify({ error: error.message });
    // 精简字段以节省 Token
    return JSON.stringify(
      data.map((c) => ({
        name: c.name,
        price: c.price,
        discount: c.discount,
        capacity: c.maxCapacity,
      }))
    );
  },
  // 查询客人 (支持模糊搜索)
  get_guests: async ({ name }: { name?: string }) => {
    let query = supabase
      .from("guests")
      .select("id, fullName, email, nationality");
    if (name) {
      query = query.ilike("fullName", `%${name}%`);
    }
    const { data, error } = await query.limit(5); // 限制返回数量
    if (error) return JSON.stringify({ error: error.message });
    return JSON.stringify(data);
  },
  // 查询最近预订
  get_recent_bookings: async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("id, startDate, endDate, status, totalPrice, guests(fullName)")
      .order("startDate", { ascending: false })
      .limit(5);
    if (error) return JSON.stringify({ error: error.message });
    return JSON.stringify(data);
  },
};

// 2. 定义工具描述 (告诉 AI 它有哪些能力)
const toolsDefinition = [
  {
    type: "function",
    function: {
      name: "get_cabins",
      description: "获取所有小屋/房间的信息，包含名称、价格、容量等。",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "get_guests",
      description: "查询客人信息。如果不提供名称，则返回最近的客人列表。",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string", description: "客人的名字（支持模糊匹配）" },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_recent_bookings",
      description: "获取最近的预订订单记录。",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
];

const generateToken = async (apiKey: string) => {
  const [id, secret] = apiKey.split(".");
  const encoder = new TextEncoder();
  const encodedSecret = encoder.encode(secret);

  return await new SignJWT({
    api_key: id,
    exp: Date.now() + 3600 * 1000,
    timestamp: Date.now(),
  })
    .setProtectedHeader({ alg: "HS256", sign_type: "SIGN" })
    .sign(encodedSecret);
};

export interface ChatMessage {
  role: "user" | "assistant" | "system" | "tool";
  content: string;
  tool_call_id?: string;
  name?: string; // tool name
}

// 3. 智能 Agent 流程：支持工具调用
export async function* runAgent(messages: ChatMessage[]) {
  const token = await generateToken(API_KEY);

  // 第一步：发送请求，询问 AI 是否需要调用工具
  // 为了稳定性，这一步我们使用非流式请求 (stream: false)
  const firstResponse = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "glm-4",
      messages: messages,
      tools: toolsDefinition,
      tool_choice: "auto",
    }),
  });

  const firstData = await firstResponse.json();
  const choice = firstData.choices?.[0];
  const responseMessage = choice?.message;

  // 情况 A: AI 决定调用工具
  if (responseMessage?.tool_calls) {
    // 1. 将 AI 的“思考”过程（工具调用请求）加入历史
    const toolCalls = responseMessage.tool_calls;
    // 构建 assistant 消息，必须包含 tool_calls 字段，但这里为了简化类型，我们在 content 里说明，实际请求时要构造标准格式
    // 简单起见，我们重新构造一个新的 messages 数组用于第二轮请求
    const newMessages = [...messages, responseMessage];

    // 2. 执行工具
    for (const toolCall of toolCalls) {
      const functionName = toolCall.function.name;
      const functionArgs = JSON.parse(toolCall.function.arguments);

      // 告诉 UI 我们正在查询数据库
      yield `*(正在查询数据库: ${functionName})...*\n\n`;

      let functionResult = "";
      try {
        if (functionName in toolsImplementation) {
          // @ts-expect-error 动态调用
          functionResult = await toolsImplementation[functionName](
            functionArgs
          );
        } else {
          functionResult = JSON.stringify({ error: "Tool not found" });
        }
      } catch (error) {
        functionResult = JSON.stringify({ error: (error as Error).message });
      }

      // 3. 将工具执行结果作为 'tool' 类型的消息加入历史
      newMessages.push({
        role: "tool",
        content: functionResult,
        tool_call_id: toolCall.id,
        name: functionName,
      });
    }

    // 4. 第二轮请求：带上工具结果，请求最终回答
    const secondResponse = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify({
        model: "glm-4",
        messages: newMessages,
        stream: true, // 开启流式输出
      }),
    });

    if (!secondResponse.body) return;
    const reader = secondResponse.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      const lines = chunk.split("\n");
      for (const line of lines) {
        if (line.startsWith("data:") && line !== "data: [DONE]") {
          try {
            const data = JSON.parse(line.slice(5));
            const content = data.choices[0]?.delta?.content || "";
            if (content) yield content;
          } catch (e) {
            console.error(e);
          }
        }
      }
    }
  } else {
    // 情况 B: AI 不需要调用工具，直接回复了 (非流式结果，我们模拟成流式输出)
    if (responseMessage?.content) {
      yield responseMessage.content;
    }
  }
}
