import React, { useState, useEffect } from "react"

const Login = () => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className=" flex flex-col justify-center m-auto  flex-auto w-92 border border-black p-3">
      <p className="text font-semibold text-2xl pb-3">Login</p>
      <label>Username</label>
      <input
        placeholder="Username"
        className="w-80 border rounded-sm h-10 border-black"
        onChange={(e) => {
          setUserName(e.target.value)
        }}
      />

      {userName.length === 0 ? (
        <p className="text text-red-600">* Email Required</p>
      ) : null}

      <label>Password</label>
      <input
        placeholder="password"
        type="password"
        className="w-80 border rounded-sm h-10 border-black"
        onChange={(e) => {
          setPassword(e.target.value)
        }}
      />

      {password.length === 0 ? (
        <p className="text text-red-600">* Password Required</p>
      ) : null}

      <div className="ml-auto p-2 w-40">
        <button className="border p-2 w-full rounded-md font-bold">
          Login
        </button>
      </div>
      <br />
      <p className="m-auto">-or-</p>
      <div className="flex flex-row justify-center w-full p-1 m-auto bg-blue-600 border rounded-md">
        <button>Signup</button>
      </div>
    </div>
  )
}

export default Login
