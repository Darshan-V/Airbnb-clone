import { getUserById, getUserByEmail, addNewUser } from "../models/userModel.js"
import { hashPassword } from "./hashPassword.js"

async function getUserByUserData(req, res) {
  try {
    const userId = req.params.id
    if (Number(userId)) {
      const user = await getUserById(userId)
      res.json(user[0])
    } else {
      const user = await getUserByEmail(userId)
      res.json(user[0])
    }
  } catch (err) {
    res.sendStatus(500)
  }
}

async function registerNewUser(name, email, password) {
  name = name
  email = email
  password = password
  const isExistingUser = await getUserByEmail(email)
  if (isExistingUser.length !== 0) {
    throw new Error("user exist proceed to login")
  } else {
    const hashedPassword = await hashPassword(password)
    const newUser = await addNewUser(name, email, hashedPassword)
    if (!newUser) {
      throw new Error("user not regestered")
    }
  }
}

export { getUserByUserData, registerNewUser }
