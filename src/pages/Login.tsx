import LoginForm from "@/components/authentication/LoginForm";
import Logo from "@/components/logo/Logo";
import Heading from "@/ui/Heading";
import styled from "styled-components";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

const Login: React.FC = () => {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Please log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
};

export default Login;
