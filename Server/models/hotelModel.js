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

const searchHotel = async (searchString) => {
  const hotels = await pool.query(
    `select images.imageUrl, property.id, property.name,property.address,property.price,property.type
    from images 
    left join property 
    on images.property_id = property.id where address->>'location' ilike '%${searchString}%' or name ilike '%${searchString}%'`
  )
  return hotels.rows
}

const filterHotels = async (minPrice, maxPrice) => {
  const hotels = await pool.query(
    `select images.imageUrl, property.id, property.name,property.address,property.price,property.type
    from images 
    left join property 
    on images.property_id = property.id where price < $1 and price > $2`,
    [maxPrice, minPrice]
  )
  return hotels.rows
}

const searchListing = async (queryString) => {
  const min = queryString.minPrice
  const max = queryString.maxPrice
  const type = queryString.type
  const search = queryString.search
  console.log(search)
  const searchedListing = await pool.query(
    `SELECT *
      FROM property
      WHERE (
         name ilike '%' || $1 || '%' or $1 is NULL
      )  AND (
        price >= $2 OR $2 IS NULL
      ) AND (
        price <= $3 OR $3 IS NULL
      )AND type = $4 or $4 is NULL`,
    [search, min, max, type]
  )
  return searchedListing.rows
}

export {
  getHotels,
  getImages,
  getHotelById,
  getHotelByType,
  searchHotel,
  filterHotels,
  searchListing
}
