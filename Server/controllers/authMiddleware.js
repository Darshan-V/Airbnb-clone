import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const verifyUserToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json("unauthorized request")
  }
  const token = req.headers["authorization"].split("")[1]
  if (!token) {
    return res.status(401).json("access denied no token found")
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded.user
    next()
  } catch (error) {
    res.status(400).json("invalid token")
  }
}

export { verifyUserToken }
