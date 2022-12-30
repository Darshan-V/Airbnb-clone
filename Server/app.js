import express from "express"
import cors from "cors"
import { initDB } from "./models/config/init.js"
import { getHotels, getImages } from "./models/hotelModel.js"
import { reserveSlot } from "./models/bookingsModel.js"

const PORT = 8000

const app = express()
app.use(express.json())
app.use(cors())
initDB()

app.get("/", async (req, res) => {
  const hotels = await getHotels()
  res.json(hotels)
})

app.get("/images/:id", async (req, res) => {
  const hotelId = req.params.id
  const images = await getImages(hotelId)
  res.json(images)
})

app.post("/booking/:id", async (req, res) => {
  const hotelId = req.params.id
  const checkIn = req.body.checkIn
  const checkOut = req.body.checkOut
  const bookingStatus = req.body.bookingStatus
  const userId = req.body.userId
  const night = req.body.nights
  const confirmBooking = await reserveSlot(
    checkIn,
    checkOut,
    bookingStatus,
    hotelId
  )
  res.json(confirmBooking)
})

app.listen(PORT, () => {
  console.log(`Server running at port:${PORT}`)
})
