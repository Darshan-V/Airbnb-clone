import { createSession } from "../models/sessionModel.js"
import { authenticateUser } from "../utils/authenticateUser.js"

async function signin(req, res) {
  try {
    const { email, password } = req.body
    if (
      email.length === 0 ||
      password.length === 0
    ) {
      res.status(406).json("empty credentials")
    } else {
      const [token, user] =
        await authenticateUser(email, password)
      if (!token) {
        res.status(417).json("no token")
        return
      }
      const sesssion = await createSession(
        user?.id,
        token
      )
      console.log(sesssion)
      res
        .cookie("token", token, {
          httpOnly: true,
          sameSite: true
        })
        .json("created user session ")
    }
  } catch (error) {
    res.status(401).send(error.stack)
  }
}

export { signin }
