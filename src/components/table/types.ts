export interface TableProps {
  children: React.ReactNode;
  columns: string;
}

export interface HeaderProps {
  children: React.ReactNode;
}

export interface RowProps {
  children: React.ReactNode;
}

export interface BodyProps<T = unknown> {
  data: T[];
  render: (item: T) => React.ReactNode;
}

export interface FooterProps {
  children: React.ReactNode;
}

export interface TableComponentProps extends React.FC<TableProps> {
  Header: React.FC<HeaderProps>;
  Row: React.FC<RowProps>;
  Body: <T = unknown>(props: BodyProps<T>) => React.ReactElement;
  Footer: React.FC<FooterProps>;
}

export interface TableContextProps {
  columns: string;
}
