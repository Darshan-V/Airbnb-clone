import { pool } from "../models/config/init.js"

const checkCheckIn = async (checkIn, hotelId) => {
  try {
    console.log(
      "🚀 ~ file: reservation.js:4 ~ checkCheckIn ~ checkIn",
      checkIn,
      hotelId
    )

    const isReserved = await pool.query(
      `select exists (select true from bookings where check_in = $1 and property_id = $2)`,
      [checkIn, hotelId]
    )
    return isReserved.rows
  } catch (err) {
    return err
  }
}

export { checkCheckIn }
