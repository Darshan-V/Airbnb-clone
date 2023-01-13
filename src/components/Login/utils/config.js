import { getUserById } from "./../../lib/apiClient.js"

const getUserData = async (userName) => {
  const userData = await getUserById(userName)
  return userData
}

const checkUser = async (userName) => {
  const userData = await getUserData(userName)
  if (userData?.email !== userName) {
    return false
  } else {
    return userData?.id
  }
}

export { checkUser }
