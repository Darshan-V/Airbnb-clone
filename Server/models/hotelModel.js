import { pool } from "./config/init.js"

const getHotels = async () => {
  const hotels =
    await pool.query(`select images.imageUrl, property.id, property.name,property.address,property.price,property.type
  from images 
  left join property 
  on images.property_id = property.id`)
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

const getHotelByType = async (type) => {
  const hotels = await pool.query("select * from property where type = $1", [
    type
  ])
  return hotels.rows
}

export { getHotels, getImages, getHotelById, getHotelByType }
