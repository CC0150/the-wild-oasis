import styled from "styled-components";
import Logo from "@/components/logo/Logo";
import MainNav from "@/components/mainNav/MainNav";
import Uploader from "@/data/Uploader";

const SideBarContainer = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;

  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const SideBar: React.FC = () => {
  return (
    <SideBarContainer>
      <Logo />
      <MainNav />

      <Uploader />
    </SideBarContainer>
  );
};

export default SideBar;
