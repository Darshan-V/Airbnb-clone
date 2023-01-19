import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { signin } from "./utils/config"

const Login = () => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const doSignup = () => {
    navigate("/signup")
  }

  const login = async () => {
    await signin(userName, password)
    navigate("/home")
  }
  return (
    <div className="flex flex-col m-auto pt-2  border border-black rounded-md bg-slate-200">
      <p className="text font-semibold text-2xl pb-3 pl-2">Login</p>
      <div>
        <div className="flex flex-col m-2">
          <span>Username</span>
          <input
            placeholder=" Username"
            className="w-80 border rounded-md h-8 border-black"
            onBlur={(e) => {
              setUserName(e.target.value)
            }}
          />
          {userName.length === 0 ? (
            <p className="text-red-500 italic text-sm">* Required field</p>
          ) : null}
        </div>
        <div className="flex flex-col m-2">
          <span>Password</span>
          <input
            placeholder=" Password"
            type="password"
            className="w-80 border rounded-md h-8 border-black"
            onBlur={(e) => {
              setPassword(e.target.value)
            }}
          />
          {password.length === 0 ? (
            <p className="text-red-500 italic text-sm">* Required field</p>
          ) : null}
        </div>

        <div className="ml-auto p-2 w-40 ">
          <button
            className="border p-2 w-full rounded-md font-bold bg-green-600  text-white"
            onClick={() => {
              login()
            }}
          >
            Login
          </button>
        </div>
      </div>

      <div className="bg-slate-300">
        <div className="flex flex-col justify-center w-full p-1 m-auto border rounded-md">
          <p className="m-auto">Don't have an account?</p>
          <button
            onClick={() => {
              doSignup()
            }}
            className="text underline text-blue-700"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
