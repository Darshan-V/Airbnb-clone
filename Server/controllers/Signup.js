import { registerNewUser } from "./user.js"

async function signup(req, res) {
  try {
    let { name, email, password } = req.body
    name = name.trim()
    email = email.trim()
    password = password.trim()
    if (name.length === 0 || email.length === 0 || password.length === 0) {
      res.status(406).json("invalid input details")
    } else if (!/^[a-zA-Z]*$/.test(name)) {
      res.status(406).json("invalid username")
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(406).json("invalid email address")
    } else if (password.length < 8) {
      res
        .status(406)
        .json("password length should be greater than 8 characters")
    } else {
      await registerNewUser(name, email, password)
      res.json(`${name} registered proceed to login`)
    }
  } catch (err) {
    res.sendStatus(500)
  }
}

export { signup }
