import express from "express"
import cors from "cors"
const PORT = 8000

const app = express()
app.use(cors())

app.listen(PORT, () => {
  console.log(`Server running at port:${PORT}`)
})
