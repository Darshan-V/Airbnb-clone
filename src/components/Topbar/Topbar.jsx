import React, { useState } from "react"
import { TbAerialLift, TbSearch } from "react-icons/tb"
import { useNavigate, useParams } from "react-router"

const Topbar = () => {
  const [search, setSearch] = useState(false)
  const navigate = useNavigate()
  const params = useParams()

  return (
    <div className="flex justify-between w-full m-auto bg-white-300  sticky top-0 bg-white">
      <div
        className="flex justify-center mr-auto rounded-lg "
        onClick={() => {
          navigate("/home")
        }}
      >
        <TbAerialLift className="text text-6xl font text-yellow-600 hover:text-yellow-400" />
      </div>
      {params?.id === undefined ? (
        <div className="flex ml-auto">
          <div className="flex flex-row">
            <TbSearch className="m-auto text-yellow-700 text-3xl font-bold" />
          </div>

          <div className="m-auto">
            <input
              placeholder="Search destination..."
              className="h-10 w-96 border-2 border-orange-200 border-b-orange-500 focus:outline-none rounded-md "
            />
          </div>
        </div>
      ) : null}

      {params?.id ? (
        <div className="flex flex-row justify-evenly">
          <div className="w-20 m-auto">
            <span>Photos</span>
          </div>
          <div className="w-20 m-auto">
            <span>Reviews</span>
          </div>
          <div className="w-20 m-auto">
            <span>Location</span>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Topbar
