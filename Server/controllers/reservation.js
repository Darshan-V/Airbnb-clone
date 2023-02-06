import { checkAvailableSlots, reserveSlot } from "../models/bookingsModel.js"

async function checkAvailablity(req, res) {
  try {
    const { hotelId, checkIn, checkOut } = req.params
    const bookedSlots = await checkAvailableSlots(checkIn, checkOut, hotelId)
    res.json(bookedSlots)
  } catch (err) {
    res.sendStatus(500)
  }
}

async function makeBooking(req, res) {
  try {
    const hotelId = req.params.id
    const { checkIn, checkOut, total, status } = req.body
    const userId = req.userId
    if (checkIn < Date.now() || checkOut <= checkIn || checkOut <= Date.now()) {
      res.json("invalid date format").status(409)
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
