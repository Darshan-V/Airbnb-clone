import { authenticateUser } from "./authenticateUser.js"

async function signin(req, res) {
  try {
    const { email, password } = req.body
    if (email.length === 0 || password.length === 0) {
      res.status(406).json("empty credentials")
    } else {
      const token = await authenticateUser(email, password)
      res
        .cookie("token", token, { httpOnly: true, sameSite: true })
        .json("loggend in")
    }
  } catch (error) {
    res.status(401).send(error.message)
  }
}

export { signin }
