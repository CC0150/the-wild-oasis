import Heading from "@/ui/Heading";
import { StyledErrorFallback, Box } from "./style";
import { ErrorFallbackProps } from "./type";
import GlobalStyles from "@/styles/GlobalStyles";
import Button from "@/ui/Button";

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <>
      <GlobalStyles />
      <StyledErrorFallback>
        <Box>
          <Heading as="h1">Oops! Something went wrong.</Heading>
          <p>{error.message}</p>
          <Button $size="large" onClick={resetErrorBoundary}>
            Try again
          </Button>
        </Box>
      </StyledErrorFallback>
    </>
  );
};

export default ErrorFallback;
