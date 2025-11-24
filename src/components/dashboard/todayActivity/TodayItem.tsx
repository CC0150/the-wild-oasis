import { Booking } from "@/components/bookings/types";
import { Guest, StyledTodayItem } from "./style";
import Tag from "@/ui/Tag";
import { Flag } from "@/ui/Flag";
import Button from "@/ui/Button";
import { Link } from "react-router";
import CheckoutButton from "@/components/check-in-out/CheckoutButton";

interface TodayItemProps {
  activity: Booking;
}

const TodayItem: React.FC<TodayItemProps> = ({ activity }) => {
  const { id, status, guests, numNights } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag $type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag $type="blue">Departing</Tag>}

      <Flag
        src={guests.countryFlag as string}
        alt={`Flag of ${guests.country}`}
      />

      <Guest>{guests.fullName}</Guest>
      <div>{numNights} nights</div>

      {status === "unconfirmed" && (
        <Button
          $variation="primary"
          $size="small"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}

      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
};

export default TodayItem;
