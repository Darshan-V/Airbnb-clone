import express from "express"
import { checkAvailablity, makeBooking } from "../controllers/reservation.js"
import { verifyToken } from "../middleware/verifyToken.js"
const routes = express.Router()

routes.get(
  "/check/slots/:hotelId/:checkIn/:checkOut",
  verifyToken,
  checkAvailablity
)

routes.post("/hotels/:id/booking/", verifyToken, makeBooking)

export { routes }
