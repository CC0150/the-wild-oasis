import styled from "styled-components";
import { useState } from "react";
import ButtonIcon from "@/ui/ButtonIcon";
import { HiOutlineUser, HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import LogOut from "../authentication/LogOut";
import { useNavigate } from "react-router";
import DarkModeToggle from "@/ui/DarkModeToggle";
import AiChatWindow from "../ai/AiChatWindow";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

const MenuItem = styled.li`
  position: relative;
`;

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
        {isChatOpen && <AiChatWindow onClose={() => setIsChatOpen(false)} />}
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
