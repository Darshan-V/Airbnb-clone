const apiUrl = "http://localhost:8000"

async function registerUser(name, email, password) {
  const postData = await fetch(`${apiUrl}/signup`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password
    })
  })
  return postData
}

export { registerUser }
