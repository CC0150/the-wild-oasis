import { formatCurrencyCNY } from "@/utils/helpers";
import Stat from "./Stat";
import { StatsProps } from "./types";
import {
  HiOutlineBriefcase,
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

const Stats: React.FC<StatsProps> = ({
  recentBookings,
  confirmedStays,
  numDays,
  cabinCount,
}) => {
  // 计算总预订数
  const numBookings = recentBookings.length;
  // 计算已确认住宿的总销售额
  const sales = recentBookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  // 计算已确认住宿的总入住数
  const checkins = confirmedStays.length;
  // 计算已确认住宿的占比(入住率)
  const numCheckInNights = confirmedStays.reduce(
    (acc, cur) => acc + cur.numNights,
    0
  );
  const occupation = numCheckInNights / (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrencyCNY(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
};

export default Stats;
