import { Outlet } from "react-router";
import Header from "@/components/header/Header";
import SideBar from "@/components/sideBar/SideBar";
import styled from "styled-components";

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: auto;
`;

const StyledAppLayoutr = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;

const AppLayout: React.FC = () => {
  return (
    <StyledAppLayoutr>
      <Header />
      <SideBar />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayoutr>
  );
};

export default AppLayout;
