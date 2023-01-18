import bcrypt from "bcrypt"

const verifyHashedPassword = async (password, hashedPassword) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword)
    return match
  } catch (error) {
    return error
  }
}

export { verifyHashedPassword }
