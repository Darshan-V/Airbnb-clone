import express from "express"
import cors from "cors"
import session from "express-session"
import { initDB } from "./models/config/init.js"
import { getHotelById, getHotels, getImages } from "./models/hotelModel.js"
import { reserveSlot } from "./models/bookingsModel.js"
import { getUserById, getUserByUserName } from "./models/userModel.js"
import { checkAvailableSlots } from "./controllers/reservation.js"
import { routes as loginRouter } from "./routes/Login.js"

const PORT = 8000

const app = express()
app.use(express.json())
app.use(
  cors({ origin: "http://localhost:5173", methods: "GET,PUT,POST,DELETE" })
)
initDB()

app.get("/hotels", async (req, res) => {
  try {
    const hotels = await getHotels()
    res.json(hotels)
  } catch (err) {
    res.sendStatus(500)
  }
})

app.get("/hotel/:id/images", async (req, res) => {
  try {
    const hotelId = req.params.id
    const images = await getImages(hotelId)
    console.log(images[0].imageUrl)
    res.json(images[0].imageurl)
  } catch (err) {
    res.sendStatus(500)
  }
})

app.get("/hotel/:id", async (req, res) => {
  try {
    const hotelId = req.params.id
    const hotel = await getHotelById(hotelId)
    res.json(hotel[0])
  } catch (err) {
    res.sendStatus(500)
  }
})

app.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id
    if (Number(userId)) {
      const user = await getUserById(userId)
      res.json(user)
    } else {
      const user = await getUserByUserName(userId)
      res.json(user)
    }
  } catch (err) {
    res.sendStatus(500)
  }
})

app.get("/check/slots/:hotelId/:checkIn/:checkOut", async (req, res) => {
  try {
    const { hotelId, checkIn, checkOut } = req.params
    const bookedSlots = await checkAvailableSlots(checkIn, checkOut, hotelId)
    res.json(bookedSlots)
  } catch (err) {
    res.sendStatus(500)
  }
})

app.post("/hotel/:id/booking/", async (req, res) => {
  try {
    const hotelId = req.params.id
    const { checkIn, checkOut, userId, total } = req.body
    console.log("🚀 ~ file: app.js:65 ~ app.post ~ req.body", req.body)

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
})

//-------------------------------test oauth---------------------------------------------
// app.use(
//   session({
//     secret: "shhhhh",
//     saveUninitialized: false, // don't save unmodified session
//     resave: true,
//     cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 },
//     unset: "destroy"
//   })
// )

app.use("/", loginRouter)

app.listen(PORT, () => {
  console.log(`Server running at port:${PORT}`)
})
