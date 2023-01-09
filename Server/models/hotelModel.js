import { pool } from "./config/init.js"

const getHotels = async () => {
  const hotels = await pool.query(`select * from property;`)
  return hotels.rows
}
const getImages = async (hotelId) => {
  const images = await pool.query(
    `select * from images where property_id = $1`,
    [hotelId]
  )
  return images.rows
}

const getHotelById = async (hotelId) => {
  const hotel = await pool.query("select * from property where id = $1", [
    hotelId
  ])
  return hotel.rows
}

export { getHotels, getImages, getHotelById }
