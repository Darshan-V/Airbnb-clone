import {
  getHotels,
  getImages,
  getHotelById,
  getHotelByType,
  searchHotel,
  filterHotels
} from "../models/hotelModel.js"

async function getAllHotels(req, res) {
  try {
    const hotels = await getHotels()
    console.log(req.headers)
    res.json(hotels)
  } catch (err) {
    res.sendStatus(500)
  }
}

async function getHotelImages(req, res) {
  try {
    const hotelId = req.params.id
    const images = await getImages(hotelId)
    res.json(images[0].imageurl)
  } catch (err) {
    res.sendStatus(500)
  }
}

async function getHotelByHotelId(req, res) {
  try {
    const hotelId = req.params.id
    const hotel = await getHotelById(hotelId)
    res.json(hotel[0])
  } catch (err) {
    res.sendStatus(500)
  }
}

async function getHotelsByHotelType(req, res) {
  try {
    const hotelType = req.params.hotelType
    const hotels = await getHotelByType(hotelType)
    res.json(hotels)
  } catch (err) {
    res.sendStatus(500)
  }
}

async function searchHotels(req, res) {
  try {
    const hotelName = req.params.hotelName
    const hotels = await searchHotel(hotelName)
    res.json(hotels)
  } catch (error) {
    res.sendStatus(500)
  }
}

async function controlFilterHotels(req, res) {
  try {
    const maxPrice = req.params.maxPrice
    const minPrice = req.params.minPrice
    const hotels = await filterHotels(minPrice, maxPrice)
    res.json(hotels)
  } catch (error) {
    console.log(error.stack)
    res.sendStatus(500)
  }
}

export {
  getAllHotels,
  getHotelImages,
  getHotelByHotelId,
  getHotelsByHotelType,
  searchHotels,
  controlFilterHotels
}
