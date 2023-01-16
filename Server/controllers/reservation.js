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
    const { checkIn, checkOut, userId, total } = req.body

    const confirmBooking = await reserveSlot(
      checkIn,
      checkOut,
      hotelId,
      userId,
      total
    )
    res.json(confirmBooking)
  } catch (err) {
    res.sendStatus(500)
  }
}

export { checkAvailablity, makeBooking }
