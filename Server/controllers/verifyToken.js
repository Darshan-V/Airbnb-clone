import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const verifyToken = (req, res, next) => {
  try {
    const reqToken = req.headers.cookie.split("=")[1]
    const decoded = jwt.verify(reqToken, process.env.JWT_SECRET)
    req.userId = decoded.id
    next()
  } catch (err) {
    res.status(401).json("unauthorized")
  }
}

export { verifyToken }
