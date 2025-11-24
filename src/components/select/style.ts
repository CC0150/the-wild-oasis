import styled from "styled-components";

interface SelectProps {
  $type?: string;
}

export const StyledSelect = styled.select<SelectProps>`
  font-size: 1.4rem;
  padding: 1rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.$type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;
