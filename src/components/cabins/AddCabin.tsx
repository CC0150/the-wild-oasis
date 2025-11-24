import Button from "@/ui/Button";
import CreateCabinForm from "@/components/cabins/CreateCabinForm";
import Modal from "../modal/Modal";

const AddCabin: React.FC = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Content name="cabin-form">
          <CreateCabinForm />
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default AddCabin;
