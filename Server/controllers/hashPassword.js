import bcrypt from "bcrypt"

const hashPassword = (password) => {
  const hashedPassword = bcrypt.hash(password, 10)
  return hashedPassword
}

export { hashPassword }
