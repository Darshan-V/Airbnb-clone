import { deleteSession } from "../models/sessionModel.js"

async function logout(req, res) {
  try {
    const sessionId = req.sessionId
    if (!sessionId) {
      return res.status(401).json("invalid user")
    }
    const logoutUser = await deleteSession(sessionId)
    res.status(200).json("user logged out!")
  } catch (error) {
    res.json(error)
  }
}

export { logout }
