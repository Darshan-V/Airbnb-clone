import { pool } from "./config/init.js"

const getUserById = async (userId) => {
  const user = await pool.query("select * from users where id = $1", [userId])
  return user.rows
}

const getUserByUserName = async (userName) => {
  const user = await pool.query("select * from users where email = $1", [
    userName
  ])
  return user.rows
}

export { getUserById, getUserByUserName }
