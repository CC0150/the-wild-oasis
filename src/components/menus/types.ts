import React from "react";

export interface MenusProps {
  children: React.ReactNode;
}

export interface MenuProps {
  children: React.ReactNode;
}

export interface ToggleProps {
  id: string;
}

export interface ListProps {
  children: React.ReactNode;
  id: string;
  ref?: React.RefObject<HTMLUListElement>;
}

export interface ItemProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export interface MenusContextProps {
  openId: string;
  open: (id: string) => void;
  close: () => void;
  position: {
    x: number;
    y: number;
  };
  setPosition: (position: { x: number; y: number }) => void;
}

export interface MenusComponentProps extends React.FC<MenusProps> {
  Menu: React.FC<MenuProps>;
  Toggle: React.FC<ToggleProps>;
  List: React.FC<ListProps>;
  Item: React.FC<ItemProps>;
}
