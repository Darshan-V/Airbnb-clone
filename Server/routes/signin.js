import express from "express"
import { signin } from "../controllers/Signin.js"
const routes = express.Router()

routes.post("/signin", signin)

export { routes }
