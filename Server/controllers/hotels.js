import { getHotels, getImages, getHotelById } from "../models/hotelModel.js"

async function getAllHotels(req, res) {
  try {
    const hotels = await getHotels()
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

export { getAllHotels, getHotelImages, getHotelByHotelId }
