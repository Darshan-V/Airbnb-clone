import { pool } from "./config/init.js"

const reserveSlot = async (
  checkinDate,
  checkoutDate,
  placeId,
  userId,
  total,
  status
) => {
  await pool.query(
    `insert into bookings (check_in, check_out, property_id, user_id, total_price, status) values($1, $2, $3, $4, $5 ,$6)`,
    [checkinDate, checkoutDate, placeId, userId, total, status]
  )
  return "reserved slot"
}

const checkAvailableSlots = async (checkIn, checkOut, hotelId) => {
  const isAvailable = await pool.query(
    "select * from bookings where $1 between check_in and check_out or $2 between check_in and check_out or $1 <= check_in and $2 >= check_out and property_id = $3",
    [checkIn, checkOut, hotelId]
  )
  return isAvailable.rows
}

export { reserveSlot, checkAvailableSlots }
