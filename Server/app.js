import express from "express"
import cors from "cors"
import session from "express-session"
import { initDB } from "./models/config/init.js"
import { routes as signupRouter } from "./routes/Signup.js"
import { routes as signinRouter } from "./routes/signin.js"
import { routes as loginRouter } from "./routes/Login.js"
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

//-------------------------------test oauth---------------------------------------------
app.set("trust proxy", 1) // trust first proxy
app.use(
  session({
    name: `daffyduck`,
    secret: "some-secret-example",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // This will only work if you have https enabled!
      maxAge: 60000 // 1 min
    }
  })
)

app.use("/", loginRouter)

app.listen(PORT, () => {
  console.log(`Server running at port:${PORT}`)
})
