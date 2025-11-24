import Button from "@/ui/Button";
import { useCheckOut } from "./hooks/useCheckOut";

interface CheckoutButtonProps {
  bookingId: number;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ bookingId }) => {
  const { checkOut, isCheckingOut } = useCheckOut();
  return (
    <Button
      $variation="primary"
      $size="small"
      onClick={() => checkOut(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
};

export default CheckoutButton;
