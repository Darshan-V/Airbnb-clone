import { pool } from "../models/config/init.js"

const checkCheckIn = async (checkIn, hotelId) => {
  try {
    const isReserved = await pool.query(
      `select exists (select true from bookings where check_in = $1 and property_id = $2)`,
      [checkIn, hotelId]
    )
    return isReserved.rows
  } catch (err) {
    return err
  }
}

const checkAvailableSlots = async (checkIn, checkOut, hotelId) => {
  try {
    const isAvailable = await pool.query(
      "select * from bookings where $1 between check_in and check_out or $2 between check_in and check_out and property_id = $3",
      [checkIn, checkOut, hotelId]
    )
    return isAvailable.rows
  } catch (error) {
    return error.stack
  }
}

// const getDaysArray = function (start, end) {
//   const arr = []
//   for (
//     const dt = new Date(start);
//     dt <= new Date(end);
//     dt.setDate(dt.getDate() + 1)
//   ) {
//     arr.push(new Date(dt))
//   }
//   return arr
// }

// const getDatesInbetween = async (hotelId) => {
//   const start = await pool.query(
//     `select check_in from bookings where property_id = $1`,
//     [hotelId]
//   )
//   const end = await pool.query(
//     `select check_out from bookings where property_id = $1`,
//     [hotelId]
//   )
//   const startDate = start.rows
//   const endDate = end.rows

//   console.log(startDate)

//   const daylist = getDaysArray(
//     new Date(startDate[0]?.check_in),
//     new Date(endDate[0]?.check_out)
//   )
//   const dateList = daylist
//     .map((date) => date.toISOString().slice(0, 10))
//     .join(",")
//   return dateList
// }
//TODO create table with reserved dates and hotelid
//TODO check betweeen checkin and checkout
//TODO change getDatesInbetween query to get all checkin and checkout dates
//FIXME checkin assigned to the vaiable write logic to include of the next slot into the returned array

export { checkCheckIn, checkAvailableSlots }
