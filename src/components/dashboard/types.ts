import { Booking } from "../bookings/types";

export interface StatProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  color: string;
}

export interface ConfirmedStaysProps {
  created_at: string;
  extraPrice: number;
  totalPrice: number;
}

export interface StatsProps {
  recentBookings: ConfirmedStaysProps[];
  confirmedStays: Booking[];
  numDays: number;
  cabinCount: number;
}
