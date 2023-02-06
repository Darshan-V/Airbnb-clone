import express from "express"
import { signin } from "../controllers/signin.js"
const routes = express.Router()

routes.post("/signin", signin)

export { routes }
