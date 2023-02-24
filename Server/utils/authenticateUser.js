import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { getUserByEmail } from "../models/userModel.js"
import { verifyHashedPassword } from "./utils.js"
dotenv.config()

async function authenticateUser(email, password) {
  const fetchedUser = await getUserByEmail(email)
  if (!fetchedUser.length) {
    throw new Error("user not exist please signup")
  }

  const hashedPassword = fetchedUser[0].password
  const matchPassword = await verifyHashedPassword(password, hashedPassword)
  if (matchPassword === false) {
    throw new Error("invalid password")
  }
  const token = jwt.sign(
    {
      email: fetchedUser[0].email,
      id: fetchedUser[0].id,
      name: fetchedUser[0].name
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "3h"
    }
  )
  return [token, fetchedUser[0]]
}

export { authenticateUser }
