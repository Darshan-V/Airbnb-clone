import { pool } from "./config/init.js"

const reserveSlot = async (
  checkinDate,
  checkoutDate,
  placeId,
  userId,
  total,
  status
) => {
  const booking = await pool.query(
    "insert into bookings (check_in, check_out, property_id, user_id, total_price, status) values($1, $2, $3, $4, $5 ,$6) returning *",
    [checkinDate, checkoutDate, placeId, userId, total, status]
  )
  return booking.rows
}

const checkAvailableSlots = async (checkIn, checkOut, hotelId) => {
  const isAvailable = await pool.query(
    `select * from bookings where property_id = $3 and (check_in between $1 and $2 or check_out between $1 and $2 or check_in <= $1 and check_out >= $2 and created_at < NOW() - INTERVAL '15 minutes') and (status = 'reserved' or status = 'confirmed')`,
    [checkIn, checkOut, hotelId]
  )
  return isAvailable.rows
}

const getReservation = async (propertyId, userId) => {
  const reservedData = await pool.query(
    "SELECT * FROM bookings WHERE created_at > NOW() - INTERVAL '15 minutes' and user_id = $2 and property_id = $1 and status = 'reserved'",
    [propertyId, userId]
  ) //check with status
  return reservedData.rows
}

const updateReservation = async (propertyId, userId, bookingId, status) => {
  const updateData = await pool.query(
    `UPDATE bookings SET status = $1 where property_id = $2 and user_id = $3 and id= $4 returning *`,
    [status, propertyId, userId, bookingId]
  )
  return updateData.rows[0]
}

const autodDeleteBookingRecords = async () => {
  const deletedData = await pool.query(
    `delete from bookings where (created_at < now() - interval '11 minutes' and status = 'reserved')`
  )
  return deletedData
}

const getBookingData = async (userId, bookingId) => {
  const bookingData = await pool.query(
    `select users.email, bookings.check_in,bookings.check_out,bookings.status,bookings.total_price,property.name,property.address
    from users
    left join bookings
    on users.id = bookings.user_id
    left join property
    on property.id = bookings.property_id
    where users.id = $1 and bookings.id = $2 and status = 'confirmed'`,
    [userId, bookingId]
  )
  return bookingData.rows[0]
}

export {
  reserveSlot,
  checkAvailableSlots,
  getReservation,
  updateReservation,
  autodDeleteBookingRecords,
  getBookingData
}
