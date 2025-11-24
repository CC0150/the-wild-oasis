import Heading from "@/ui/Heading";
import { StyledSalesChart } from "./style";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useDarkMode from "@/store/darkModeStore";
import { SalesChartProps } from "./types";
import { eachDayOfInterval, subDays, format, isSameDay } from "date-fns";

const SalesChart: React.FC<SalesChartProps> = ({ recentBookings, numDays }) => {
  // 生成最近numDays天的日期数组
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });
  const data = allDates.map((date) => ({
    label: format(date, "MMM dd"),
    // 计算该日期的总销售额
    totalSales: recentBookings
      .filter((booking) => isSameDay(new Date(booking.created_at), date))
      .reduce((acc, booking) => acc + booking.totalPrice, 0),
    // 计算该日期的额外销售额
    extraSales: recentBookings
      .filter((booking) => isSameDay(new Date(booking.created_at), date))
      .reduce((acc, booking) => acc + booking.extraPrice, 0),
  }));

  const isDarkMode = useDarkMode();
  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extraSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extraSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDates[0], "MMM dd yyyy")} &mdash;{" "}
        {format(allDates[allDates.length - 1], "MMM dd yyyy")}{" "}
      </Heading>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="￥"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="￥"
          />
          <Area
            dataKey="extraSales"
            type="monotone"
            stroke={colors.extraSales.stroke}
            fill={colors.extraSales.fill}
            strokeWidth={2}
            name="Extra sales"
            unit="￥"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
};

export default SalesChart;
