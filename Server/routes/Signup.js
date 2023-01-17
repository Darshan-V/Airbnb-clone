import express from "express"
import { signup } from "../controllers/Signup.js"
const routes = express.Router()

routes.post("/signup", signup)

export { routes }
