import UpdateSettingsForm from "@/components/settings/UpdateSettingsForm";
import Heading from "@/ui/Heading";
import Row from "@/ui/Row";

const Settings: React.FC = () => {
  return (
    <Row>
      <Heading as="h1">Update settings</Heading>
      <UpdateSettingsForm />
    </Row>
  );
};

export default Settings;
