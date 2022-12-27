import React, { useState } from "react"
import store from "../../../../airbnb-data/store.js"
import Slider from "./Slider.jsx"
import { useNavigate } from "react-router"

const Places = () => {
  const [propertyData, setPropertyData] = useState(store)
  const navigate = useNavigate()

  return (
    <div
      className="flex flex-col flex-auto m-5 hover:cursor-pointer"
      onClick={() => {
        navigate("/property")
      }}
    >
      <div className="flex">
        <Slider />
      </div>
      <div className="flex flex-row ">
        <p className="font-thin text-gray-800">
          {propertyData.name}, {propertyData.location.address}
        </p>
        <p className="text-red-500 pl-3">{propertyData.stars}</p>
      </div>
      <p className="label places-price">Rs {propertyData.price} night</p>
    </div>
  )
}

export default Places
