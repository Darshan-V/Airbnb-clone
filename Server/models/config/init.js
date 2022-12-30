import pg from "pg"
import {
  createBookings,
  createUsers,
  createPlaces,
  createImages
} from "./query.js"
const { Pool } = pg

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "signoff",
  port: 5432
})

async function initDB() {
  await pool.query(createPlaces)
  await pool.query(createBookings)
  await pool.query(createUsers)
  await pool.query(createImages)
}

export { initDB, pool }
