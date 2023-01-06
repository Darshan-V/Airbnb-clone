import express from "express"
import cors from "cors"
import { initDB } from "./models/config/init.js"
import { getHotelById, getHotels, getImages } from "./models/hotelModel.js"
import { reserveSlot } from "./models/bookingsModel.js"
import { getUserById, getUserByUserName } from "./models/userModel.js"
import { checkCheckIn, getDatesInbetween } from "./controllers/reservation.js"

const PORT = 8000

const app = express()
app.use(express.json())
app.use(cors())
initDB()

app.get("/hotels", async (req, res) => {
  const hotels = await getHotels()
  res.json(hotels)
})

app.get("/hotel/images/:id", async (req, res) => {
  const hotelId = req.params.id
  const images = await getImages(hotelId)
  res.json(images)
})

app.get("/hotel/:id", async (req, res) => {
  const hotelId = req.params.id
  const hotel = await getHotelById(hotelId)
  res.json(hotel)
})

app.get("/user/:id", async (req, res) => {
  const userId = req.params.id
  if (Number(userId)) {
    const user = await getUserById(userId)
    res.json(user)
  } else {
    const user = await getUserByUserName(userId)
    res.json(user)
  }
})

app.get("/validate/:checkin?/:id", async (req, res) => {
  const checkIn = req.params.checkin
  const hotelId = req.params.id

  const checkStartDate = await checkCheckIn(checkIn, hotelId)
  res.json(checkStartDate)
})

app.get("/booking/getDates/:propertyId", async (req, res) => {
  try {
    const hotelId = req.params.propertyId
    const getDates = await getDatesInbetween(hotelId)
    res.json(getDates)
  } catch (err) {
    res.json(err)
  }
})
//FIXME route params /hotel/:id/...
app.post("/hotel/booking/:id", async (req, res) => {
  const hotelId = req.params.id
  const checkIn = req.body.checkIn
  const checkOut = req.body.checkOut
  const userId = req.body.userId
  const total = req.body.total
  //TODO destructure req.body
  // console.log(hotelId, checkIn, checkOut, userId, total)
  // TODO error handling
  //FIXME total-> backend, userId->from the session(login)
  const confirmBooking = await reserveSlot(
    checkIn,
    checkOut,
    hotelId,
    userId,
    total
  )
  res.json(confirmBooking)
})

app.listen(PORT, () => {
  console.log(`Server running at port:${PORT}`)
})
