import express from "express"
import {
  oauthInitialization,
  processOauthResponse
} from "../controllers/Login.js"

const routes = express.Router()

routes.get("/oauth/googleAuth", oauthInitialization)
routes.get("/auth/google/callback", processOauthResponse)

export { routes }
