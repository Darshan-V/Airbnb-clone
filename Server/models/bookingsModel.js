import { pool } from "./config/init.js"

const reserveSlot = async (
  checkinDate,
  checkoutDate,
  bookingStatus,
  placeId,
  userId,
  nights
) => {
  try {
    await pool.query(
      `insert into bookings (checkin, checkout,bookingstatus,placeid,userid,nights) values($1, $2, $3, $4, $5,$6)`,
      [checkinDate, checkoutDate, bookingStatus, placeId, userId, nights]
    )
    return "reserved slot"
  } catch (error) {
    console.error(error)
  }
}

export { reserveSlot }
