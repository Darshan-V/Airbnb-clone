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

app.get("/hotel/:id/images", async (req, res) => {
  const hotelId = req.params.id
  const images = await getImages(hotelId)
  console.log(images[0].imageUrl)
  res.json(images[0].imageurl)
})

app.get("/hotel/:id", async (req, res) => {
  const hotelId = req.params.id
  const hotel = await getHotelById(hotelId)
  res.json(hotel[0])
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

// app.get("/validate/:checkin?/:id", async (req, res) => {
//   const checkIn = req.params.checkin
//   const hotelId = req.params.id

//   const checkStartDate = await checkCheckIn(checkIn, hotelId)
//   res.json(checkStartDate)
// })

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
app.post("/hotel/:id/booking/", async (req, res) => {
  const hotelId = req.params.id
  const { checkIn, checkOut, userId, total } = req.body
  console.log("🚀 ~ file: app.js:65 ~ app.post ~ req.body", req.body)

  // TODO error handling
  //FIXME total-> backend, userId->from the session(login)
  const confirmBooking = await reserveSlot(
    checkIn,
    checkOut,
    hotelId,
    userId,
    total
  )
  res.json(req.body)
})

app.listen(PORT, () => {
  console.log(`Server running at port:${PORT}`)
})
