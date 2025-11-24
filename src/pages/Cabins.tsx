import CabinTable from "@/components/cabins/CabinTable";
import Heading from "@/ui/Heading";
import Row from "@/ui/Row";
import AddCabin from "@/components/cabins/AddCabin";
import CabinTableOperations from "@/components/cabins/CabinTableOperations";

const Cabins: React.FC = () => {
  return (
    <div>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>

      <Row>
        <CabinTable />

        <AddCabin />
      </Row>
    </div>
  );
};

export default Cabins;
