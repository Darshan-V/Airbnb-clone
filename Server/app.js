import express from "express"
import cors from "cors"
import session from "express-session"
import { initDB } from "./models/config/init.js"
import { getHotelById, getHotels, getImages } from "./models/hotelModel.js"
import { reserveSlot } from "./models/bookingsModel.js"
import { getUserById, getUserByUserName } from "./models/userModel.js"
import { checkAvailableSlots } from "./controllers/reservation.js"
import { routes as loginRouter } from "./routes/Login.js"
import { authSession } from "./controllers/authMiddleware.js"

const PORT = 8000

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,PUT,POST,DELETE",
    credentials: true
  })
)
initDB()

app.use(
  session({
    secret: "lol"
  })
)

app.get("/hotels", authSession, async (req, res) => {
  try {
    const hotels = await getHotels()
    res.json(hotels)
  } catch (err) {
    res.sendStatus(500)
  }
})

app.get("/hotel/:id/images", authSession, async (req, res) => {
  try {
    const hotelId = req.params.id
    const images = await getImages(hotelId)
    console.log(images[0].imageUrl)
    res.json(images[0].imageurl)
  } catch (err) {
    res.sendStatus(500)
  }
})

app.get("/hotel/:id", authSession, async (req, res) => {
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
      res.json(user[0])
    } else {
      const user = await getUserByUserName(userId)
      res.json(user[0])
    }
  } catch (err) {
    res.sendStatus(500)
  }
})

app.get(
  "/check/slots/:hotelId/:checkIn/:checkOut",
  authSession,
  async (req, res) => {
    try {
      const { hotelId, checkIn, checkOut } = req.params
      const bookedSlots = await checkAvailableSlots(checkIn, checkOut, hotelId)
      res.json(bookedSlots)
    } catch (err) {
      res.sendStatus(500)
    }
  }
)

app.post("/hotel/:id/booking/", authSession, async (req, res) => {
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

app.use("/", loginRouter)

app.listen(PORT, () => {
  console.log(`Server running at port:${PORT}`)
})
