import { pool } from "../models/config/init.js"
async function authSession(req, res, next) {
  const sessionData = req.session
  //   console.log(
  //     "🚀 ~ file: authMiddleware.js:3 ~ authSession ~ sessionData",
  //     sessionData
  //   )
  pool.query(
    "select * from users where email = $1",
    [sessionData.username],
    function (err, rows) {
      if (err) throw err
      if (rows.length) {
        const user = rows[0]
        req.session.username = user.email
      }
    }
  )
  next()
}

export { authSession }
