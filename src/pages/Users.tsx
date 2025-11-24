import SignupForm from "@/components/authentication/SignupForm";
import Heading from "@/ui/Heading";
import Row from "@/ui/Row";

const NewUsers: React.FC = () => {
  return (
    <Row>
      <Heading as="h1">Create a new user</Heading>
      <SignupForm />
    </Row>
  );
};

export default NewUsers;
