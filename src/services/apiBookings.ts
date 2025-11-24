import supabase from "./supabase";
import { BookingQueryParams } from "@/components/bookings/types";
import { PAGE_SIZE } from "@/utils/constants";
import {
  CheckInBookingParams,
  CheckOutBookingParams,
} from "@/components/check-in-out/types";
import { getToday } from "@/utils/helpers";

export async function getBookings({ filter, sort, page }: BookingQueryParams) {
  let query = supabase
    .from("bookings")
    .select("*, cabins(name), guests(fullName, email)", { count: "exact" });

  if (filter) {
    query = query.eq(filter.field, filter.value);
  }

  if (sort) {
    query = query.order(sort.sortField, {
      ascending: sort.sortOrder === "asc", //如果是asc，那么就按照升序排序
    });
  }

  //Pagination
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE - 1;
  query = query.range(start, end);

  const { data, error, count } = await query;

  if (error) {
    console.error("Error fetching bookings:", error.message);
    throw new Error("Bookings could not get loaded");
  }

  return { data, count };
}

export async function getBookingById(id: number) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error fetching booking:", error.message);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
//date:supabase需要ISOString格式的日期字符串
export async function getBookingsAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extraPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
//date:supabase需要ISOString格式的日期字符串
export async function getStaysAfterDate(date: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(
  id: number,
  obj: CheckInBookingParams | CheckOutBookingParams
) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id: number) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
