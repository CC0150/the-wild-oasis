import ButtonIcon from "@/ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "@/components/authentication/hooks/useLogout";
import SpinnerMini from "@/ui/SpinnerMini";

const LogOut: React.FC = () => {
  const { logoutMutate, isLoggingOut } = useLogout();

  const logOut = () => {
    logoutMutate();
  };

  return (
    <ButtonIcon onClick={logOut} disabled={isLoggingOut}>
      {!isLoggingOut ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
};

export default LogOut;
