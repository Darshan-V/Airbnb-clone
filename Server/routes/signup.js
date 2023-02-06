import express from "express"
import { signup } from "../controllers/signup.js"
const routes = express.Router()

routes.post("/signup", signup)

export { routes }
