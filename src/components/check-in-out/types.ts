export interface CheckInBookingParams {
  status: string;
  isPaid: boolean;
}

export interface BreakfastParams {
  breakfast: {
    hasBreakfast: boolean;
    extraPrice: number;
    totalPrice: number;
  };
}

export interface CheckOutBookingParams {
  status: string;
}
