import { checkAvailableSlots, reserveSlot } from "../models/bookingsModel.js"

async function checkAvailablity(req, res) {
  try {
    const { hotelId, checkIn, checkOut } = req.params
    if (
      checkIn < new Date().toISOString().substring(0, 10) ||
      checkOut <= checkIn ||
      checkOut <= new Date().toISOString().substring(0, 10)
    ) {
      res.status(409).json("invalid date format")
      return "invalid date format"
    } else if (!hotelId || hotelId === "undefined") {
      res.status(406).json("connot make reservation on invalid hotel")
    } else {
      const bookedSlots = await checkAvailableSlots(checkIn, checkOut, hotelId)
      res.json(bookedSlots)
    }
  } catch (err) {
    res.sendStatus(500)
  }
}

async function makeBooking(req, res) {
  try {
    const hotelId = req.params.id
    const { checkIn, checkOut, total, status } = req.body
    const userId = req.userId
    if (
      checkIn < new Date().toISOString().substring(0, 10) ||
      checkOut <= checkIn ||
      checkOut <= new Date().toISOString().substring(0, 10)
    ) {
      res.status(409).json("invalid date format")
    } else if (!hotelId || hotelId === "undefined") {
      res.status(406).json("required hotelId")
    } else if (!userId) {
      res.status(403).json("invalid user")
    } else {
      const confirmBooking = await reserveSlot(
        checkIn,
        checkOut,
        hotelId,
        userId,
        total,
        status
      )
      res.json(confirmBooking)
    }
  } catch (err) {
    res.sendStatus(500)
  }
}

export { checkAvailablity, makeBooking }
