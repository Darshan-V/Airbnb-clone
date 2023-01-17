import { getUserByEmail } from "../models/userModel.js"
async function authenticateUser(email, password) {
  try {
    const fetchedUser = await getUserByEmail(email)
    return fetchedUser
  } catch (error) {
    console.log(error)
  }
}

export { authenticateUser }
