import express from "express"
import cors from "cors"
import session from "express-session"
import { initDB } from "./models/config/init.js"
import { reserveSlot } from "./models/bookingsModel.js"
import { routes as loginRouter } from "./routes/Login.js"
import { routes as hotelRouter } from "./routes/hotel.js"
import { routes as userRouter } from "./routes/user.js"
import { routes as reservationRouter } from "./routes/reservation.js"

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
app.use("/", hotelRouter)

app.use("/", userRouter)

app.use("/", reservationRouter)

//-------------------------------test oauth---------------------------------------------

app.use("/", loginRouter)

app.listen(PORT, () => {
  console.log(`Server running at port:${PORT}`)
})
