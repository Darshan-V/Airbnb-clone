import express from "express"
import { signin } from "../controllers/Signin.js"
import { verifyToken } from "../controllers/verifyToken.js"
const routes = express.Router()

routes.post("/signin", verifyToken, signin)

export { routes }
