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

const getHotelByType = async (hotelType) => {
  const hotels = await pool.query(
    `select images.imageUrl, property.id, property.name,property.address,property.price,property.type
  from images 
  left join property 
  on images.property_id = property.id where type = $1`,
    [hotelType]
  )
  return hotels.rows
}

const searchHotel = async (hotelName) => {
  const hotels = await pool.query("select * from property where name = $1", [
    hotelName
  ])
  return hotels.rows
}

const filterHotels = async (minPrice, maxPrice) => {
  const hotels = await pool.query(
    "select * from property where price < $1 and price > $2",
    [maxPrice, minPrice]
  )
  return hotels.rows
}

export {
  getHotels,
  getImages,
  getHotelById,
  getHotelByType,
  searchHotel,
  filterHotels
}
