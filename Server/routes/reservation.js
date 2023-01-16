import express from "express"
import { checkAvailablity, makeBooking } from "../controllers/reservation.js"
const routes = express.Router()

routes.get("/check/slots/:hotelId/:checkIn/:checkOut", checkAvailablity)

routes.post("/hotel/:id/booking/", makeBooking)

export { routes }
