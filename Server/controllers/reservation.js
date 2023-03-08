import {
  checkAvailableSlots,
  reserveSlot,
  getReservation,
  updateReservation
} from "../models/bookingsModel.js"

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
    console.log(err.stack)
    res.sendStatus(500)
  }
}

async function getReservedEntry(req, res) {
  try {
    const hotelId = req.params.propertyId
    const userId = req.userId
    if (!hotelId || hotelId === "undefined") {
      res.status(406).json("required hotel id")
    } else if (!userId || userId === "undefined") {
      res.status(403).json("invalid user")
    } else {
      const reservationData = await getReservation(hotelId, userId)
      res.json(reservationData)
    }
  } catch (error) {
    res.sendStatus(500)
  }
}

async function updateReservedSlots(req, res) {
  try {
    const hotelId = req.params.propertyId
    const { status, bookingId } = req.body
    const userId = req.userId
    if (!hotelId || hotelId === "undefined") {
      return res.status(406).json("required hotelId")
    }
    if (!userId || userId === "undefined") {
      return res.status(403).json("invalid user")
    }
    if (!bookingId || bookingId === "undefined") {
      return res.status(406).json("required bookingId")
    }
    if (!status || !String(status) || status === undefined) {
      return res.status(403).json("invalid entry")
    }
    const updateReservationData = await updateReservation(
      hotelId,
      userId,
      bookingId,
      status
    )
    if (!updateReservationData) {
      return res.status(404).json("booking not found")
    }
    res.json(updateReservationData)
  } catch (error) {
    console.log(error.stack)
    res.sendStatus(500)
  }
}

export { checkAvailablity, makeBooking, getReservedEntry, updateReservedSlots }
