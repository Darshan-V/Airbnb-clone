import { authenticateUser } from "./authenticateUser.js"

async function signin(req, res) {
  try {
    const { email, password } = req.body
    email = email.trim()
    password = password.trim()
    if (email.length === 0 || password.length === 0) {
      res.status(406).json("empty credentials")
    } else {
      const authenticatedUser = await authenticateUser(email, password)
      res.status(200).json("valid user")
    }
  } catch (err) {
    res.json(err)
  }
}

export { signin }
