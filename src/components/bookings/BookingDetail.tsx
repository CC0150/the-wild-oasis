import BookingDataBox from "./BookingDataBox";
import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import Tag from "@/ui/Tag";
import ButtonGroup from "@/ui/ButtonGroup";
import Button from "@/ui/Button";
import ButtonText from "@/ui/ButtonText";
import { HeadingGroup } from "@/components/bookings/style";

import { useMoveBack } from "../../hooks/useMoveBack";
import Spinner from "@/ui/Spinner";

import { useGetBookingById } from "@/components/bookings/hooks/useGetBookingById";
import { useNavigate } from "react-router";
import { useCheckOut } from "../check-in-out/hooks/useCheckOut";
import Modal from "../modal/Modal";
import ConfirmDelete from "@/ui/ConfirmDelete";
import { useDeleteBooking } from "@/components/bookings/hooks/useDeleteBooking";
import Empty from "@/ui/Empty";

const BookingDetail: React.FC = () => {
  const { data: booking, isLoading, error } = useGetBookingById();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { checkOut, isCheckingOut } = useCheckOut();
  const { deleteBookingMutate, isDeleting } = useDeleteBooking();

  if (isLoading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;
  if (!booking) return <Empty resourceName="booking" />;

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag $type={statusToTagName[status as keyof typeof statusToTagName]}>
            {status.replace("-", " ")}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal>
          <Modal.Open opens="delete">
            <Button $variation="danger">Delete</Button>
          </Modal.Open>
          <Modal.Content name="delete">
            <ConfirmDelete
              resourceName={`${booking.guests.fullName}'s booking`}
              onConfirm={() =>
                deleteBookingMutate(bookingId, {
                  onSettled: () => navigate(-1),
                })
              }
              disabled={isDeleting}
            />
          </Modal.Content>
        </Modal>

        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check-in
          </Button>
        )}

        {status === "checked-in" && (
          <Button onClick={() => checkOut(bookingId)} disabled={isCheckingOut}>
            Check-out
          </Button>
        )}

        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
};

export default BookingDetail;
