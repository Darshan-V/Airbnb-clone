import express from "express"
import { getUserByUserData } from "../controllers/user.js"
import { verifyToken } from "./../middleware/verifyToken.js"
const routes = express.Router()

routes.get("/users/:id", verifyToken, getUserByUserData)

export { routes }
