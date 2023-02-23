import { authenticateUser } from "../utils/authenticateUser.js"

async function signin(req, res) {
  try {
    const { email, password } = req.body
    if (email.length === 0 || password.length === 0) {
      res.status(406).json("empty credentials")
    } else {
      const [token, user] = await authenticateUser(email, password)
      console.log("🚀 ~ file: signin.js:10 ~ signin ~ user:", user)
      if (!token) {
        res.status(417).json("no token")
        return
      }
      res
        .cookie("token", token, { httpOnly: true, sameSite: true })
        .json("loggedin")
    }
  } catch (error) {
    res.status(401).send("test error")
  }
}

export { signin }
