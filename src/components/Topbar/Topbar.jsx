import React from "react"
import { TbAerialLift, TbSearch } from "react-icons/tb"

const Topbar = () => {
  return (
    <div className="flex justify-between w-full m-auto p-5 bg-white-300 border">
      <div className="flex justify-center mr-auto rounded-lg  ">
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
