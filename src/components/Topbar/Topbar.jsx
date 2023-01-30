import React, { useState } from "react"
import { TbAerialLift, TbSearch } from "react-icons/tb"
import { useNavigate } from "react-router"

const Topbar = () => {
  const [search, setSearch] = useState(false)
  const navigate = useNavigate()
  return (
    <div className="flex justify-between w-full m-auto p-5 bg-white-300  sticky top-0 bg-white">
      <div
        className="flex justify-center mr-auto rounded-lg "
        onClick={() => {
          navigate("/home")
        }}
      >
        <TbAerialLift className="text text-6xl font text-yellow-600 hover:text-yellow-400" />
      </div>
      <div className="flex ml-auto">
        <div className="flex flex-row">
          <button
            className="w-20 text-slate-600 font-bold"
            onClick={() => {
              setSearch(true)
            }}
          >
            Search
          </button>
          <TbSearch className="m-auto" />
        </div>
        {search ? (
          <div className="m-auto">
            <input
              placeholder="Search destination..."
              className="h-8 w-96 border-2 border-indigo-200 border-b-indigo-500 focus:outline-none rounded-md"
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Topbar
