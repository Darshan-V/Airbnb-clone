import express from "express"
import { getUserByUserData } from "../controllers/user.js"
import { verifyUserToken } from "./../controllers/authMiddleware.js"
const routes = express.Router()

routes.get("/users/:id", verifyUserToken, getUserByUserData)

export { routes }
