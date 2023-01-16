import { pool } from "./config/init.js"

const reserveSlot = async (
  checkinDate,
  checkoutDate,
  placeId,
  userId,
  total
) => {
  await pool.query(
    `insert into bookings (check_in, check_out, property_id, user_id, total_price) values($1, $2, $3, $4, $5)`,
    [checkinDate, checkoutDate, placeId, userId, total]
  )
  return "reserved slot"
}

const checkAvailableSlots = async (checkIn, checkOut, hotelId) => {
  const isAvailable = await pool.query(
    "select * from bookings where check_in between $1 and $2 and check_out between $1 and $2 or check_in <= $1 and check_out >= $2 and property_id = $3",
    [checkIn, checkOut, hotelId]
  )
  return isAvailable.rows
}

export { reserveSlot, checkAvailableSlots }
