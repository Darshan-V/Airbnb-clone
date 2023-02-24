import express from "express"
import { logout } from "../controllers/logout.js"
import { verifyToken } from "../middleware/verifyToken.js"
const routes = express.Router()

routes.delete("/logout", verifyToken, logout)

export { routes }
