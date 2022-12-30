import { pool } from "./config/init.js"

const reserveSlot = async (
  checkinDate,
  checkoutDate,
  bookingStatus,
  placeId,
  userId
) => {
  try {
    await pool.query(
      `insert into bookings (checkin, checkout,bookingstatus,placeid,userid) values($1, $2, $3, $4, $5)`,
      [checkinDate, checkoutDate, bookingStatus, placeId, userId]
    )
    return "reserved slot"
  } catch (error) {
    console.error(error)
  }
}

export { reserveSlot }
