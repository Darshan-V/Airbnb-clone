import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import session from "express-session"
import passport from "passport"
import { initDB } from "./models/config/init.js"
import { getHotelById, getHotels, getImages } from "./models/hotelModel.js"
import { reserveSlot } from "./models/bookingsModel.js"
import { getUserById, getUserByUserName } from "./models/userModel.js"
import { checkAvailableSlots } from "./controllers/reservation.js"
import "./auth.js"

const PORT = 8000

const app = express()
app.use(cookieParser())
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    methods: "GET,POST,PUT,DELETE,OPTIONS"
  })
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
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401)
}

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())

app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>')
})

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
)

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/google/failure"
  })
)

app.get("/protected", isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`)
})

app.get("/logout", (req, res) => {
  req.logout()
  req.session.destroy()
  res.send("Goodbye!")
})

app.get("/auth/google/failure", (req, res) => {
  res.send("Failed to authenticate..")
})

app.listen(PORT, () => {
  console.log(`Server running at port:${PORT}`)
})
