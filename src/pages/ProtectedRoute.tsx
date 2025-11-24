import { useGetUser } from "@/components/authentication/hooks/useGetUser";
import Spinner from "@/ui/Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-grey-50);
`;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  // 1.加载用户信息
  const { isLoading, isAuthenticated } = useGetUser();

  // 2.检查用户是否登录,如果未登录，重定向到登录页
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  // 3.如果用户已登录，检查是否加载完成
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  // 4.如果已登录，渲染子组件
  if (isAuthenticated) {
    return children;
  }
};

export default ProtectedRoute;
