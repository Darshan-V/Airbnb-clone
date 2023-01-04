import { pool } from "./config/init.js"

const reserveSlot = async (
  checkinDate,
  checkoutDate,
  placeId,
  userId,
  total
) => {
  try {
    await pool.query(
      `insert into bookings (check_in, check_out, property_id, user_id, total_price) values($1, $2, $3, $4, $5)`,
      [checkinDate, checkoutDate, placeId, userId, total]
    )
    return "reserved slot"
  } catch (error) {
    console.error(error)
  }
}

export { reserveSlot }
