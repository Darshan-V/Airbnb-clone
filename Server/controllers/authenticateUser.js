import { getUserByEmail } from "../models/userModel.js"
import { verifyHashedPassword } from "./utils.js"

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
        return { name: fetchedUser[0].name, email: fetchedUser[0].email }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export { authenticateUser }
