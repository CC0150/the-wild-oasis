import styled from "styled-components";
import { useGetRecentBookings } from "./hooks/useRecentBookings";
import { useGetRecentStays } from "./hooks/useRecentStays";
import Spinner from "@/ui/Spinner";
import Stats from "./Stats";
import { useGetCabins } from "../cabins/hooks/useGetCabins";
import SalesChart from "./salesChart/SalesChart";
import DurationChart from "./durationChart/DurationChart";
import TodayActivity from "./todayActivity/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout: React.FC = () => {
  const {
    confirmedStays,
    isPending: isStaysPending,
    numDays,
  } = useGetRecentStays();
  const { bookings: recentBookings, isPending: isBookingPending } =
    useGetRecentBookings();
  const { cabins, isLoading: isCabinPending } = useGetCabins();

  if (isStaysPending || isBookingPending || isCabinPending) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        numDays={numDays}
        recentBookings={recentBookings || []}
        confirmedStays={confirmedStays || []}
        cabinCount={cabins?.length || 0}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays || []} />
      <SalesChart recentBookings={recentBookings || []} numDays={numDays} />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
