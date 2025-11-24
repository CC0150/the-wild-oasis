import BookingRow from "./BookingRow";
import Table from "@/components/table/Table";
import Menus from "@/components/menus/Menus";
import Empty from "@/ui/Empty";
import { useGetBookings } from "./hooks/useGetBookings";
import Spinner from "@/ui/Spinner";
import Pagination from "@/components/pagination/Pagination";

const BookingTable: React.FC = () => {
  const { bookings, isLoading, error, count } = useGetBookings();

  if (isLoading) return <Spinner />;

  if (error) return <p>Error: {error.message}</p>;

  if (!bookings.length) {
    return <Empty resourceName="bookings" />;
  }

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count as number} />
        </Table.Footer>
      </Table>
    </Menus>
  );
};

export default BookingTable;
