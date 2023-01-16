import { getUserById, getUserByUserName } from "../models/userModel.js"

async function getUserByUserData(req, res) {
  try {
    const userId = req.params.id
    if (Number(userId)) {
      const user = await getUserById(userId)
      res.json(user[0])
    } else {
      const user = await getUserByUserName(userId)
      res.json(user[0])
    }
  } catch (err) {
    res.sendStatus(500)
  }
}

export { getUserByUserData }
