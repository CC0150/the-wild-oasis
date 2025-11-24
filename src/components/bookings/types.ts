export interface Guest {
  id?: number;
  created_at?: string;
  email: string;
  fullName: string;
  nationalID: string;
  nationality: string;
  countryFlag?: FileList | string;
}

export interface Booking {
  id: number;
  cabinId?: number;
  guestId?: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extraPrice: number;
  totalPrice: number;
  status: string;
  hasBreakfast?: boolean;
  isPaid: boolean;
  observations?: string;
  cabins: {
    name: string;
  };
  guests: {
    email?: string;
    fullName: string;
    country?: string;
    countryFlag?: FileList | string;
    nationalID?: string;
  };
}

export interface BookingRowProps {
  booking: Booking;
}

export interface BookingFilter {
  field: string;
  value: string;
}

export interface SortFilter {
  sortField: string;
  sortOrder: string;
}

export interface BookingQueryParams {
  filter: BookingFilter | null;
  sort: SortFilter | null;
  page: number;
}

export interface BookingDataBoxProps {
  booking: Booking;
}
