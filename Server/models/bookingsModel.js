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
    "select * from bookings where property_id = $3 and (check_in between $1 and $2 or check_out between $1 and $2 or check_in <= $1 and check_out >= $2) ",
    [checkIn, checkOut, hotelId]
  )
  return isAvailable.rows
}

const getReservation = async (propertyId, userId) => {
  const reservedData = await pool.query(
    "select * from bookings where property_id = $1 and user_id = $2",
    [propertyId, userId]
  )
  return reservedData.rows
}

export { reserveSlot, checkAvailableSlots, getReservation }
