import express from "express"
import { getUserByUserData } from "../controllers/user.js"
const routes = express.Router()

routes.get("/user/:id", getUserByUserData)

export { routes }
