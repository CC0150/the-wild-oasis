import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import useDarkMode from "@/store/darkModeStore";
import { useEffect } from "react";

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, setIsDarkMode: toggleDarkMode } = useDarkMode();

  useEffect(() => {
    document.documentElement.classList.remove(
      isDarkMode ? "light-mode" : "dark-mode"
    );
    document.documentElement.classList.add(
      isDarkMode ? "dark-mode" : "light-mode"
    );
  }, [isDarkMode]);

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
};

export default DarkModeToggle;
