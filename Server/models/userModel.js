import { pool } from "./config/init.js"

const getUserById = async (userId) => {
  const user = await pool.query(
    "select name,email,id from users where id = $1",
    [userId]
  )
  return user.rows
}

const getUserByEmail = async (userName) => {
  const user = await pool.query("select * from users where email = $1", [
    userName
  ])
  return user.rows
}

const addNewUser = async (userName, email, password) => {
  const userData = await pool.query("insert into users values($1, $2, $3)", [
    userName,
    email,
    password
  ])
  return userData.rows
}
export { getUserById, getUserByEmail, addNewUser }
