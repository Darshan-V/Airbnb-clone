import express from "express"
import {
  getAllHotels,
  getHotelImages,
  getHotelByHotelId
} from "../controllers/hotels.js"

const routes = express.Router()

routes.get("/hotels", getAllHotels)

routes.get("/hotel/:id/images", getHotelImages)

routes.get("/hotel/:id", getHotelByHotelId)

export { routes }
