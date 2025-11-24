import { ReactNode, ReactElement } from "react";

export interface ModalProps {
  children: ReactNode;
}

export interface OpenProps {
  children: ReactElement;
  opens: string;
}

export interface ContentProps {
  children: ReactElement;
  name: string;
}

export interface ModalComponent extends React.FC<ModalProps> {
  Open: React.FC<OpenProps>;
  Content: React.FC<ContentProps>;
}

export interface ModalContextType {
  openName: string;
  close: () => void;
  open: (name: string) => void;
}
