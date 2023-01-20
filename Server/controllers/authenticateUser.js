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
        const token = jwt.sign(
          {
            email: fetchedUser[0].email,
            id: fetchedUser[0].id,
            name: fetchedUser[0].name
          },
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
