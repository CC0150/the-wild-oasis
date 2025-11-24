import { formatCurrencyCNY } from "@/utils/helpers";
import { CabinName, Discount, Img, Price } from "./style";
import { CabinRowProps } from "./types";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./hooks/useDeleteCabin";
import { FaCopy, FaEdit, FaTrash } from "react-icons/fa";
import { useCreateCabin } from "./hooks/useCreateCabin";
import Modal from "../modal/Modal";
import ConfirmDelete from "@/ui/ConfirmDelete";
import Menus from "../menus/Menus";
import Table from "../table/Table";

const CabinRow: React.FC<CabinRowProps> = ({ cabin }) => {
  const {
    id: cabinId,
    name,
    maxCapacity,
    price,
    discount,
    image,
    description,
  } = cabin;

  const { isDeleting, deleteCabinMutate } = useDeleteCabin();
  const { createCabinMutate } = useCreateCabin();

  //复制一个cabin
  const copyCabin = () => {
    createCabinMutate({
      newCabinData: {
        name: `${name} - 副本`,
        maxCapacity,
        price,
        discount,
        description,
        image,
      },
    });
  };

  return (
    <Table.Row>
      <Img src={image as string} alt={name} />
      <CabinName>{name}</CabinName>
      <div>最多可容纳 {maxCapacity} 人</div>
      <Price>{formatCurrencyCNY(price)}</Price>
      {discount ? (
        <Discount>{formatCurrencyCNY(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={String(cabinId)} />

            <Menus.List id={String(cabinId)}>
              <Menus.Item icon={<FaCopy />} onClick={copyCabin}>
                copy
              </Menus.Item>

              <Modal.Open opens="edit">
                <Menus.Item icon={<FaEdit />}>edit</Menus.Item>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Item icon={<FaTrash />}>delete</Menus.Item>
              </Modal.Open>
            </Menus.List>

            <Modal.Content name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Content>

            <Modal.Content name="delete">
              <ConfirmDelete
                resourceName={name}
                onConfirm={() => deleteCabinMutate(cabinId!)}
                disabled={isDeleting}
              />
            </Modal.Content>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default CabinRow;
