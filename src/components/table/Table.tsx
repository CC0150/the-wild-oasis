import { createContext, useContext } from "react";
import {
  StyledTable,
  StyledBody,
  StyledHeader,
  StyledRow,
  Empty,
  StyledFooter,
} from "./style";
import {
  TableComponentProps,
  HeaderProps,
  RowProps,
  BodyProps,
  TableContextProps,
  FooterProps,
} from "./types";

const TableContext = createContext<TableContextProps>({
  columns: "",
});

const Table: TableComponentProps = ({ children, columns }) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader as="header" $columns={columns}>
      {children}
    </StyledHeader>
  );
};

const Row: React.FC<RowProps> = ({ children }) => {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role="row" $columns={columns}>
      {children}
    </StyledRow>
  );
};

const Body = <T,>({ data, render }: BodyProps<T>) => {
  if (!data || data.length === 0) return <Empty>No data available</Empty>;

  return <StyledBody>{data.map((item) => render(item))}</StyledBody>;
};

const Footer: React.FC<FooterProps> = ({ children }) => {
  return <StyledFooter>{children}</StyledFooter>;
};

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
