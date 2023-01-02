import { pool } from "./config/init.js"

const getHotels = async () => {
  let hotels = await pool.query(`select * from property;`)
  return hotels.rows
}
const getImages = async (hotelId) => {
  let images = await pool.query(`select * from images where property_id = $1`, [
    hotelId
  ])
  return images.rows
}

export { getHotels, getImages }
