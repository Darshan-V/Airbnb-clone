import express from "express"
import {
  getAllHotels,
  getHotelImages,
  getHotelByHotelId,
  getHotelsByHotelType,
  searchHotels,
  controlFilterHotels
} from "../controllers/hotels.js"
import { verifyToken } from "../controllers/verifyToken.js"

const routes = express.Router()

routes.get("/hotels", verifyToken, getAllHotels)

routes.get("/hotels/:id/images", verifyToken, getHotelImages)

routes.get("/hotels/:id", verifyToken, getHotelByHotelId)

routes.get("/hotels/types/:hotelType?", verifyToken, getHotelsByHotelType)

routes.get("/hotels/search/:searchString", verifyToken, searchHotels)

routes.get(
  "/hotels/price/:minPrice?/:maxPrice?",
  verifyToken,
  controlFilterHotels
)

export { routes }
