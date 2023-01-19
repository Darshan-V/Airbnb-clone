import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { getUserByEmail } from "../models/userModel.js"
import { verifyHashedPassword } from "./utils.js"
dotenv.config()

async function authenticateUser(email, password) {
  try {
    const fetchedUser = await getUserByEmail(email)
    if (!fetchedUser.length) {
      return "user not exist please signup"
    } else {
      const hashedPassword = fetchedUser[0].password
      const matchPassword = await verifyHashedPassword(password, hashedPassword)
      if (!matchPassword) {
        return "invalid password"
      } else {
        // console.log(process.env.JWT_SECRET)
        const token = jwt.sign(
          { email: fetchedUser[0].email, name: fetchedUser[0].name },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h"
          }
        )
        return token
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export { authenticateUser }
