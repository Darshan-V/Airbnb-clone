import React from "react"
import { useNavigate } from "react-router"

const Topbar = () => {
  const navigate = useNavigate()

  return (
    <div className="flex w-full m-auto p-5 bg-orange-300">
      <div className="flex justify-center hover:bg-sky-500 hover:ring-sky-500 ml-auto rounded-lg  w-24 h-12 ">
        <button
          className="text-slate-900 hover:text-white text-sm font-semibold w-full"
          onClick={() => navigate("/Login")}
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Topbar
