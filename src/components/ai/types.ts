export interface Props {
  onClose: () => void;
}

export interface MessageItem {
  key: string;
  role: "user" | "assistant";
  content: string;
  loading?: boolean;
}
