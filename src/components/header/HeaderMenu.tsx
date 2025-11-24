import ButtonIcon from "@/ui/ButtonIcon";
import { StyledHeaderMenu } from "./style";
import { HiOutlineUser } from "react-icons/hi2";
import LogOut from "../authentication/LogOut";
import { useNavigate } from "react-router";
import DarkModeToggle from "@/ui/DarkModeToggle";

const HeaderMenu: React.FC = () => {
  const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
      <li>
        <DarkModeToggle />
      </li>
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
