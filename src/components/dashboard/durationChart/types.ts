import { Booking } from "@/components/bookings/types";

export interface DurationChartProps {
  confirmedStays: Booking[];
}

// 修改DurationChartData接口以符合Recharts的ChartDataInput要求
export interface DurationChartData {
  duration: string;
  value: number;
  color: string;
  [key: string]: string | number; // 添加索引签名以满足ChartDataInput要求
}
