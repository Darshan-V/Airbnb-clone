import bcrypt from "bcrypt"

const verifyHashedPassword = async (password, hashedPassword) => {
  const match = await bcrypt.compare(password, hashedPassword)
  return match
}

export { verifyHashedPassword }
