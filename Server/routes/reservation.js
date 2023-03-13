import express from "express"
import {
  checkAvailablity,
  makeBooking,
  getReservedEntry,
  updateReservedSlots
} from "../controllers/reservation.js"
import { getUserBooking } from "../controllers/bookings.js"
import { verifyToken } from "../middleware/verifyToken.js"
const routes = express.Router()

routes.get(
  "/check/slots/:hotelId/:checkIn/:checkOut",
  verifyToken,
  checkAvailablity //route
)

routes.post("/hotels/:id/booking/", verifyToken, makeBooking)

routes.get("/bookings/:propertyId", verifyToken, getReservedEntry)

routes.put(
  "/bookings/confirmation/:propertyId/",
  verifyToken,
  updateReservedSlots
)

routes.get("/bookings/confirmed/:bookingId", verifyToken, getUserBooking)

export { routes }
