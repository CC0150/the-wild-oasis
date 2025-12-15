import { useState, lazy, Suspense } from "react";
import ButtonIcon from "@/ui/ButtonIcon";
import { HiOutlineUser, HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import LogOut from "../authentication/LogOut";
import { useNavigate } from "react-router";
import DarkModeToggle from "@/ui/DarkModeToggle";
import { StyledHeaderMenu, MenuItem, LoadingWrapper } from "./style";
import Spinner from "@/ui/Spinner";

// 使用 lazy 动态导入 AI 聊天组件
const AIChatWindow = lazy(() => import("../ai/AiChatWindow"));

const HeaderMenu: React.FC = () => {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <StyledHeaderMenu>
      <li>
        <DarkModeToggle />
      </li>

      {/* AI 客服按钮 */}
      <MenuItem>
        <ButtonIcon onClick={() => setIsChatOpen((open) => !open)}>
          <HiOutlineChatBubbleLeftRight />
        </ButtonIcon>

        {/* 使用 Suspense 包裹懒加载组件 */}
        {isChatOpen && (
          <Suspense
            fallback={
              <LoadingWrapper>
                <Spinner />
              </LoadingWrapper>
            }
          >
            <AIChatWindow onClose={() => setIsChatOpen(false)} />
          </Suspense>
        )}
      </MenuItem>

      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <LogOut />
      </li>
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;
