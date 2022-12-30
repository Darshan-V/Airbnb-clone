import { pool } from "./config/init.js"

const getHotels = async () => {
  let hotels = await pool.query(`select * from places;`)
  return hotels.rows
}
const getImages = async (hotelId) => {
  let images = await pool.query(`select * from images where placeid = $1`, [
    hotelId
  ])
  return images.rows
}

export { getHotels, getImages }
