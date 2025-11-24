import Heading from "@/ui/Heading";
import Row from "@/ui/Row";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardFilter from "@/components/dashboard/DashboardFilter";

const Dashboard: React.FC = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>

      <DashboardLayout />
    </>
  );
};

export default Dashboard;
