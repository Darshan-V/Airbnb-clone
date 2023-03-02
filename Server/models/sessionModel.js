import { pool } from "./config/init.js"

const createSession = async (userId, sessionId) => {
  const session = await pool.query("insert into sessions values($1,$2)", [
    userId,
    sessionId
  ])
  return session.rows
}

const getSession = async (sessionId) => {
  const session = await pool.query(
    "select users.email, sessions.user_id, sessions.session_id from users left join sessions on users.id = sessions.user_id where session_id = $1",
    [sessionId]
  )
  return session.rows[0]
}

const deleteSession = async (sessionId) => {
  const session = await pool.query(
    "delete from sessions where session_id = $1",
    [sessionId]
  )
  return session.rows[0]
}

export { createSession, getSession, deleteSession }
