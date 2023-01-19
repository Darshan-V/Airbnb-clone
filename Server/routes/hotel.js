import express from "express"
import {
  getAllHotels,
  getHotelImages,
  getHotelByHotelId
} from "../controllers/hotels.js"
import { verifyToken } from "../controllers/verifyToken.js"

const routes = express.Router()

routes.get("/hotels", verifyToken, getAllHotels)

routes.get("/hotel/:id/images", verifyToken, getHotelImages)

routes.get("/hotel/:id", verifyToken, getHotelByHotelId)

export { routes }
