import React from "react"
import { TbAerialLift, TbSearch } from "react-icons/tb"
import { useNavigate } from "react-router"

const Topbar = () => {
  const navigate = useNavigate()
  return (
    <div className="flex justify-between w-full m-auto p-5 bg-white-300 border">
      <div
        className="flex justify-center mr-auto rounded-lg "
        onClick={() => {
          navigate("/home")
        }}
      >
        <TbAerialLift className="text text-6xl font text-yellow-600 hover:text-yellow-400" />
      </div>
      <div className="flex m-auto">
        <button>Places</button>
        <button>Search</button>
        <TbSearch />
      </div>
    </div>
  )
}

export default Topbar
