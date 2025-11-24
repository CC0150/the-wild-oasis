import {
  useState,
  useContext,
  cloneElement,
  ReactElement,
  createContext,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { Button, Overlay, StyledModal } from "./style";
import {
  ModalComponent,
  OpenProps,
  ContentProps,
  ModalContextType,
} from "./types";
import { useOutsideClick } from "@/hooks/useOutsideClick";

const ModalContext = createContext<ModalContextType>({
  openName: "",
  close: () => {},
  open: () => {},
});

const Modal: ModalComponent = ({ children }) => {
  const [openName, setOpenName] = useState("");

  const close = () => {
    setOpenName("");
  };

  const open = (name: string) => {
    setOpenName(name);
  };

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open: React.FC<OpenProps> = ({ children, opens: opensContentName }) => {
  const { open } = useContext(ModalContext);

  const clonedChildren = cloneElement(children as ReactElement, {
    onClick: () => open(opensContentName),
  });
  return clonedChildren;
};

const Content: React.FC<ContentProps> = ({ children, name: contentName }) => {
  const { openName, close } = useContext(ModalContext);

  const ref = useOutsideClick<HTMLDivElement>(close);

  if (openName !== contentName) return null;

  const clonedChildren = cloneElement(children as ReactElement, {
    onClose: close,
  });

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{clonedChildren}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
};

Modal.Open = Open;
Modal.Content = Content;

export default Modal;
