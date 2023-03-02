import { getSession } from "../models/sessionModel.js"

const verifyToken = async (req, res, next) => {
  try {
    const reqToken = req.headers.cookie.split("=")[1]
    const session = await getSession(reqToken)
    if (session.length !== 0) {
      req.userId = session?.user_id
      req.userEmail = session?.email
      req.sessionId = reqToken
      next()
    } else {
      res.status(401).json("invalid user")
    }
  } catch (err) {
    res.status(401).json("unauthorized")
  }
}

export { verifyToken }
