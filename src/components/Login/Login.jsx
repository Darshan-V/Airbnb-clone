import React, { useState, useEffect } from "react"
import { checkUser } from "./utils/config.js"
import { useNavigate } from "react-router"
import googleButton from "./btn_google_dark_pressed_ios.svg"
import { login } from "./../lib/apiClient.js"

const Login = () => {
  const [userName, setUserName] = useState("")
  const navigate = useNavigate()

  const validateUser = async (uName) => {
    if (await checkUser(uName)) {
      const userid = await checkUser(uName)
      navigate(`/home/${userid}`)
    }
  }
  const googleLogin = async () => {
    await login()
  }

  return (
    <div className=" flex flex-col justify-center m-auto  flex-auto w-92">
      {/* <label>Username:</label>
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
      </div> */}
      <div className="flex flex-row justify-center w-full p-1 m-auto bg-blue-600 border rounded-md">
        <div className="m-auto">
          <p className="text text-white">Signin with Google</p>
        </div>
        <div
          className="ml-auto"
          onClick={() => {
            googleLogin()
          }}
        >
          <img src={googleButton} className="bg-blue-600 w-14 h-14" />
        </div>
      </div>
    </div>
  )
}

export default Login
