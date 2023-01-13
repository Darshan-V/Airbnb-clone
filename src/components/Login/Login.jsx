import React, { useState } from "react"
import { checkUser } from "./utils/config.js"
import { useNavigate } from "react-router"

const Login = () => {
  const [userName, setUserName] = useState("")
  const navigate = useNavigate()

  const validateUser = async (uName) => {
    if (await checkUser(uName)) {
      const userid = await checkUser(uName)
      navigate(`/home/${userid}`)
    }
  }

  return (
    <div className=" flex flex-col justify-center m-auto  flex-auto w-92">
      <label>Username:</label>
      <input
        placeholder="Username"
        className="w-80 border rounded-sm "
        onChange={(e) => {
          setUserName(e.target.value)
        }}
      />
      <div className="ml-auto p-2 w-40">
        <button
          className="border p-2 w-full rounded-md font-bold"
          onClick={() => {
            validateUser(userName)
          }}
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login
