import { useState, useRef, useEffect, useMemo } from "react";
import { Bubble, Sender, XProvider } from "@ant-design/x";
import {
  UserOutlined,
  RobotOutlined,
  CloseOutlined,
  ClearOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import { Button, Avatar, Tooltip } from "antd";
import ReactMarkdown from "react-markdown";
import { runAgent, ChatMessage } from "@/services/apiAI";
import toast from "react-hot-toast";
import {
  ChatHeader,
  ChatBody,
  ChatFooter,
  MarkdownWrapper,
  StyledChatWindow,
} from "./style";
import { Props, MessageItem } from "./types";

const AIChatWindow: React.FC<Props> = ({ onClose }) => {
  const [items, setItems] = useState<MessageItem[]>([
    {
      key: "init",
      role: "assistant",
      content:
        "您好！我是您的智能数据助手。我可以帮您：\n\n- 查询当前有哪些 Guest\n- 查看最近的 Booking 订单\n- 列出所有 Cabin 信息",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const chatBodyRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // 滚动到底部函数
  const scrollToBottom = (behavior: ScrollBehavior = "auto") => {
    chatEndRef.current?.scrollIntoView({ behavior, block: "end" });
  };

  // 监听 loading 状态变化：开始生成和结束生成时都滚动到底部
  useEffect(() => {
    if (!isLoading) {
      // 生成结束后，平滑滚动到底部（修复"生成好后没有自动滚动"）
      scrollToBottom("smooth");
    } else {
      // 开始生成时，瞬间滚动到底部
      scrollToBottom("auto");
    }
  }, [isLoading]);

  // 监听内容变化：在生成过程中自动跟随（修复"生成时不能滚动" - 其实是需要跟随）
  // 注意：由于我们在下面做了节流，这里不会触发得太频繁，不会锁死 UI
  useEffect(() => {
    if (isLoading) {
      scrollToBottom("auto");
    }
  }, [items, isLoading]);

  const handleClear = () => {
    setItems([
      {
        key: "init",
        role: "assistant",
        content: "对话已清空。",
      },
    ]);
  };

  const handleSubmit = async (nextContent: string) => {
    if (!nextContent.trim() || isLoading) return;

    const userMsg: MessageItem = {
      key: Date.now().toString(),
      role: "user",
      content: nextContent,
    };
    const aiMsgId = `ai-${Date.now()}`;
    const aiMsg: MessageItem = {
      key: aiMsgId,
      role: "assistant",
      content: "",
      loading: true,
    };

    setItems((prev) => [...prev, userMsg, aiMsg]);
    setInputVal("");
    setIsLoading(true);

    try {
      const apiMessages: ChatMessage[] = items
        .filter((i) => !i.loading)
        .map((i) => ({
          role: i.role as "user" | "assistant",
          content: i.content,
        }));

      apiMessages.push({ role: "user", content: nextContent });

      let fullContent = "";
      let lastUpdateTime = 0;

      for await (const chunk of runAgent(apiMessages)) {
        fullContent += chunk;
        const now = Date.now();

        // --- 核心优化：节流更新 (Throttle) ---
        // 每 100ms 更新一次 UI，避免 React 高频重绘导致主线程卡死（修复"生成时不能滚动"）
        if (now - lastUpdateTime > 100) {
          setItems((prev) => {
            const newItems = [...prev];
            const lastItem = newItems[newItems.length - 1];
            if (lastItem && lastItem.key === aiMsgId) {
              lastItem.content = fullContent;
              lastItem.loading = false;
            }
            return newItems;
          });
          lastUpdateTime = now;
        }
      }

      // 循环结束后，执行最后一次更新，确保内容完整
      setItems((prev) => {
        const newItems = [...prev];
        const lastItem = newItems[newItems.length - 1];
        if (lastItem && lastItem.key === aiMsgId) {
          lastItem.content = fullContent;
          lastItem.loading = false;
        }
        return newItems;
      });
    } catch (error) {
      console.error(error);
      toast.error("AI 响应异常");
      setItems((prev) => {
        const newItems = [...prev];
        const lastItem = newItems[newItems.length - 1];
        if (lastItem.key === aiMsgId && !lastItem.content) {
          lastItem.content = "抱歉，查询数据库时出现错误。";
          lastItem.loading = false;
        }
        return newItems;
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 使用 useMemo 优化
  const bubbleItems = useMemo(
    () =>
      items.map((item) => ({
        key: item.key,
        placement: item.role === "user" ? "end" : "start",
        content: (
          <MarkdownWrapper>
            <ReactMarkdown>{item.content}</ReactMarkdown>
          </MarkdownWrapper>
        ),
        loading: item.loading && !item.content,
        avatar: (
          <Avatar
            size={32}
            icon={item.role === "user" ? <UserOutlined /> : <RobotOutlined />}
            style={{
              backgroundColor:
                item.role === "user" ? "var(--color-brand-600)" : "#fff",
              color: item.role === "user" ? "white" : "var(--color-brand-600)",
              border:
                item.role === "user"
                  ? "none"
                  : "1px solid var(--color-grey-200)",
            }}
          />
        ),
        style: {
          "--ant-x-bubble-bg":
            item.role === "user" ? "var(--color-brand-50)" : "#f9fafb",
          maxWidth: "90%",
        } as React.CSSProperties,
      })),
    [items]
  );

  return (
    <XProvider>
      <StyledChatWindow>
        <ChatHeader>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "18px",
              fontWeight: 600,
              color: "var(--color-grey-800)",
            }}
          >
            <DatabaseOutlined style={{ color: "var(--color-brand-600)" }} />
            <span>智能数据助手</span>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <Tooltip title="清空">
              <Button
                type="text"
                icon={<ClearOutlined />}
                onClick={handleClear}
              />
            </Tooltip>
            <Button type="text" icon={<CloseOutlined />} onClick={onClose} />
          </div>
        </ChatHeader>

        <ChatBody ref={chatBodyRef}>
          {/* @ts-expect-error Ant Design X types */}
          <Bubble.List items={bubbleItems} />
          <div ref={chatEndRef} />
        </ChatBody>

        <ChatFooter>
          <Sender
            loading={isLoading}
            value={inputVal}
            onChange={setInputVal}
            onSubmit={handleSubmit}
            placeholder="试试问：现在有哪些guest？"
            style={{ border: "none", boxShadow: "none", background: "#f3f4f6" }}
          />
        </ChatFooter>
      </StyledChatWindow>
    </XProvider>
  );
};

export default AIChatWindow;
