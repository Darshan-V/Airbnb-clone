import React, { useState } from "react"
import { useNavigate } from "react-router"
import { registerUser } from "./utils/config"

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const navigate = useNavigate()

  const userRegistration = async () => {
    if (password === confirmPassword) {
      await registerUser(name, email, confirmPassword)
      navigate("/")
    }
  }

  return (
    <div className="flex flex-col m-auto p-2 border border-black rounded-md bg-slate-200">
      <div className="flex flex-col">
        <div className="m-2 flex flex-col">
          <span>Username</span>
          <input
            placeholder="Name"
            className="w-80 h-8 focus:outline-none focus:ring-1 focus:ring-sky-600 rounded-md"
            onBlur={(e) => {
              setName(e.target.value)
            }}
          />
        </div>
        <div className="m-2 flex flex-col">
          <span>Email</span>
          <input
            placeholder="Email"
            className="w-80 h-8 focus:outline-none focus:ring-1 focus:ring-sky-600 rounded-md"
            onBlur={(e) => {
              setEmail(e.target.value)
            }}
          />
        </div>
        <div className="m-2 flex flex-col">
          <span>Password</span>
          <input
            placeholder="Password"
            type="password"
            className="w-80 h-8 focus:outline-none focus:ring-1 focus:ring-sky-600 rounded-md"
            onBlur={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <div className="m-2 flex flex-col">
          <span>Confirm Password</span>
          <input
            placeholder="Confirm password"
            type="password"
            className="w-80 h-8 focus:outline-none focus:ring-1 focus:ring-sky-600 rounded-md"
            onChange={(e) => {
              setConfirmPassword(e.target.value)
            }}
          />
        </div>
        {password !== confirmPassword ? <p>Password doesn't match</p> : null}
      </div>
      <div className="m-2">
        <p className="text text-sm text-blue-700 w-80">
          On clicking SignUp you agree Terms and Conditions of something
        </p>
      </div>
      <div className="m-auto w-40 h-9 bg-blue-200 rounded-sm flex">
        <button
          className="m-auto w-full "
          onClick={() => {
            userRegistration()
          }}
        >
          Signup
        </button>
      </div>
    </div>
  )
}

export default Signup
