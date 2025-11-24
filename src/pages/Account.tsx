import UpdateUserDataForm from "@/components/authentication/UpdateUserDataForm";
import Heading from "@/ui/Heading";
import Row from "@/ui/Row";
import UpdatePasswordForm from "@/components/authentication/UpdatePasswordForm";

const Account: React.FC = () => {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row>
        <Heading as="h3">Update user</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
};

export default Account;
