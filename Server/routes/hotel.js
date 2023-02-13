import express from "express"
import {
  getAllHotels,
  getHotelImages,
  getHotelByHotelId,
  // getHotelsByHotelType,
  // searchHotels,
  // controlFilterHotels,
  testController
} from "../controllers/hotels.js"
import { verifyToken } from "../middleware/verifyToken.js"

const routes = express.Router()

routes.use("/hotels", verifyToken)

routes.get("/hotels", getAllHotels)

routes.get("/hotels/:id/images", getHotelImages)

routes.get("/hotels/:id", getHotelByHotelId)

// routes.get("/hotels/types/:hotelType?", getHotelsByHotelType)

// routes.get("/hotels/search/:searchString", searchHotels)

// routes.get(
//   "/filters",

//   controlFilterHotels
// )

routes.get("/hotels/filters/categories", testController)

export { routes }
