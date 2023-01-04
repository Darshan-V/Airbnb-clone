import { getUserById } from "./../../lib/apiClient.js"

const getUserData = async (userName) => {
  const userData = await getUserById(userName)
  return userData
}

const checkUser = async (userName, password) => {
  const userData = await getUserData(userName)
  if (userData[0]?.name !== userName || userData[0]?.password !== password) {
    return false
  } else {
    return userData[0]?.id
  }
}

export { checkUser }
