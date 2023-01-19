import express from "express"
import cors from "cors"
import { initDB } from "./models/config/init.js"
import { routes as signupRouter } from "./routes/Signup.js"
import { routes as signinRouter } from "./routes/signin.js"
import { routes as hotelRouter } from "./routes/hotel.js"
import { routes as userRouter } from "./routes/user.js"
import { routes as reservationRouter } from "./routes/reservation.js"

const PORT = 8000

const app = express()
app.use(express.json())
app.use(
  cors({ origin: "http://localhost:5173", methods: "GET,POST,PUT,DELETE" })
)
initDB()

app.use("/", signupRouter)

app.use("/", hotelRouter)

app.use("/", userRouter)

app.use("/", reservationRouter)

app.use("/", signinRouter)

app.listen(PORT, () => {
  console.log(`Server running at port:${PORT}`)
})
