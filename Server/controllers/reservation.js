import { pool } from "../models/config/init.js"

const checkCheckIn = async (checkIn, hotelId) => {
  const isReserved = await pool.query(
    `select exists (select true from bookings where check_in = $1 and property_id = $2)`,
    [checkIn, hotelId]
  )
  return isReserved.rows
}

const checkAvailableSlots = async (checkIn, checkOut, hotelId) => {
  const isAvailable = await pool.query(
    "select * from bookings where check_in between $1 and $2 or check_out between $1 and $2 and property_id = $3",
    [checkIn, checkOut, hotelId]
  )
  return isAvailable.rows
}

export { checkCheckIn, checkAvailableSlots }
