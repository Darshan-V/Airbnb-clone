import express from "express"
import { checkAvailablity, makeBooking } from "../controllers/reservation.js"
import { verifyToken } from "../controllers/verifyToken.js"
const routes = express.Router()

routes.get(
  "/check/slots/:hotelId/:checkIn/:checkOut",
  verifyToken,
  checkAvailablity
)

routes.post("/hotel/:id/booking/", verifyToken, makeBooking)

export { routes }
