import { createContext, useState, useContext, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  MenusComponentProps,
  ToggleProps,
  ListProps,
  ItemProps,
  MenusContextProps,
} from "./types";
import { StyledButton, StyledList, StyledToggle, Menu } from "./style";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useOutsideClick } from "@/hooks/useOutsideClick";

const MenusContext = createContext<MenusContextProps>({
  openId: "",
  open: () => {},
  close: () => {},
  position: {
    x: 0,
    y: 0,
  },
  setPosition: () => {},
});

const Menus: MenusComponentProps = ({ children }) => {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const open = (id: string) => {
    setOpenId(id);
  };

  const close = () => setOpenId("");

  return (
    <MenusContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      <div>{children}</div>
    </MenusContext.Provider>
  );
};

const Toggle: React.FC<ToggleProps> = ({ id }) => {
  const { openId, open, close, setPosition } = useContext(MenusContext);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("click");
    const rect = e.currentTarget.getBoundingClientRect(); //获取元素的位置信息
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.height + rect.y + 10,
    });
    if (openId !== id || openId === "") {
      open(id);
    } else {
      close();
    }
  };

  return (
    <StyledToggle onClick={handleToggle}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};

const List: React.FC<ListProps> = ({ children, id }) => {
  const { openId, position, close } = useContext(MenusContext);

  // 使用稳定的回调函数
  const handleClose = useCallback(() => {
    close();
  }, [close]);

  // 指定正确的泛型类型 HTMLUListElement
  const ref = useOutsideClick<HTMLUListElement>(() => {
    console.log("click outside");
    handleClose();
  }, false);

  if (openId !== id) {
    return null;
  }

  return createPortal(
    <StyledList as="ul" $position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
};

const Item: React.FC<ItemProps> = ({ children, icon, onClick }) => {
  const { close } = useContext(MenusContext);

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon && <span>{icon}</span>}
        {children}
      </StyledButton>
    </li>
  );
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Item = Item;

export default Menus;
