import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DarkModeState {
  isDarkMode: boolean;
  setIsDarkMode: () => void;
}

const useDarkMode = create<DarkModeState>()(
  persist(
    (set) => ({
      isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches, //根据系统设置初始化
      setIsDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: "darkMode",
    }
  )
);

export default useDarkMode;
