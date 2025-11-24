import BookingDataBox from "@/components/bookings/BookingDataBox";

import Row from "@/ui/Row";
import Heading from "@/ui/Heading";
import ButtonGroup from "@/ui/ButtonGroup";
import Button from "@/ui/Button";
import ButtonText from "@/ui/ButtonText";

import { useMoveBack } from "@/hooks/useMoveBack";
import { useGetBookingById } from "@/components/bookings/hooks/useGetBookingById";
import Spinner from "@/ui/Spinner";
import Checkbox from "@/components/checkbox/Checkbox";
import { Box } from "./style";
import { useEffect, useState } from "react";
import { useCheckIn } from "./hooks/useCheckIn";
import { useGetSettings } from "../settings/hooks/useGetSettings";
import { formatCurrencyCNY } from "@/utils/helpers";

const CheckinBooking: React.FC = () => {
  const moveBack = useMoveBack();

  const { data: booking, isLoading, error } = useGetBookingById();
  const { settings, isLoading: isLoadingSettings } = useGetSettings();

  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  useEffect(() => {
    if (booking) {
      setConfirmPaid(booking.isPaid || false);
    }
  }, [booking]);

  const { checkIn, isCheckingIn } = useCheckIn();

  if (isLoading || isLoadingSettings) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;
  if (!booking) return <p>Booking not found</p>;

  const {
    id: bookingId,
    hasBreakfast,
    guests,
    totalPrice,
    numGuests,
    numNights,
  } = booking;
  const { breakfastPrice } = settings;

  const handleCheckin = () => {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extraPrice: breakfastTotalPrice,
          totalPrice: totalPrice + breakfastTotalPrice,
        },
      });
    } else {
      checkIn({ bookingId, breakfast: {} });
    }
  };

  const breakfastTotalPrice = breakfastPrice * numNights * numGuests;

  const handleAddBreakfast = () => {
    setAddBreakfast((addBreakfast) => !addBreakfast);
    setConfirmPaid(false);
  };

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={handleAddBreakfast}
            id="breakfast"
            disabled={isCheckingIn}
          >
            Would you like to have breakfast for{" "}
            {formatCurrencyCNY(breakfastTotalPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)}
          id="confirm"
          disabled={confirmPaid || isCheckingIn}
        >
          Confirm that {guests.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrencyCNY(totalPrice)
            : `${formatCurrencyCNY(
                totalPrice + breakfastTotalPrice
              )} (${formatCurrencyCNY(totalPrice)} + ${formatCurrencyCNY(
                breakfastTotalPrice
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
};

export default CheckinBooking;
