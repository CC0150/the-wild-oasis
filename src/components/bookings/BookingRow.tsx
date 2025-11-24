import { format, isToday, differenceInDays } from "date-fns";
import Modal from "../modal/Modal";

import { Cabin, Stacked, Amount } from "./style";
import { BookingRowProps } from "./types";
import Tag from "@/ui/Tag";
import Table from "@/components/table/Table";
import { formatCurrencyCNY } from "@/utils/helpers";
import { formatDistanceFromNow } from "@/utils/helpers";
import Menus from "../menus/Menus";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye } from "react-icons/hi2";
import { useCheckOut } from "../check-in-out/hooks/useCheckOut";
import { useNavigate } from "react-router";
import { FaTrash } from "react-icons/fa";
import ConfirmDelete from "@/ui/ConfirmDelete";
import { useDeleteBooking } from "./hooks/useDeleteBooking";

const BookingRow: React.FC<BookingRowProps> = ({ booking }) => {
  const navigate = useNavigate();
  const { deleteBookingMutate, isDeleting } = useDeleteBooking();

  const {
    id: bookingId,
    startDate,
    endDate,
    totalPrice,
    status,
    guests,
    cabins,
  } = booking;

  // Handle null/undefined guests and cabins with fallback values
  const guestName = guests?.fullName || "Unknown Guest";
  const email = guests?.email || "No email";
  const cabinName = cabins?.name || "Unknown Cabin";
  // Calculate numNights from startDate and endDate
  const numNights = differenceInDays(new Date(endDate), new Date(startDate));
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const { checkOut, isCheckingOut } = useCheckOut();

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag $type={statusToTagName[status as keyof typeof statusToTagName]}>
        {status.replace("-", " ")}
      </Tag>

      <Amount>{formatCurrencyCNY(totalPrice)}</Amount>

      <Modal>
        <Menus>
          <Menus.Menu>
            <Menus.Toggle id={String(bookingId)} />
            <Menus.List id={String(bookingId)}>
              <Menus.Item
                icon={<HiEye />}
                onClick={() => navigate(`/bookings/${bookingId}`)}
              >
                Details
              </Menus.Item>

              {status === "unconfirmed" && (
                <Menus.Item
                  icon={<HiArrowDownOnSquare />}
                  onClick={() => navigate(`/checkin/${bookingId}`)}
                >
                  Check-in
                </Menus.Item>
              )}

              {status === "checked-in" && (
                <Menus.Item
                  onClick={() => checkOut(bookingId)}
                  icon={<HiArrowUpOnSquare />}
                  disabled={isCheckingOut}
                >
                  Check-out
                </Menus.Item>
              )}

              <Modal.Open opens="delete">
                <Menus.Item icon={<FaTrash />}>delete</Menus.Item>
              </Modal.Open>
            </Menus.List>

            <Modal.Content name="delete">
              <ConfirmDelete
                resourceName={`${guestName}'s booking`}
                onConfirm={() => deleteBookingMutate(bookingId)}
                disabled={isDeleting}
              />
            </Modal.Content>
          </Menus.Menu>
        </Menus>
      </Modal>
    </Table.Row>
  );
};

export default BookingRow;
