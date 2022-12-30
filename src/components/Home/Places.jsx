import React, { useEffect, useState } from "react"
import store from "../../../../airbnb-data/store.js"
import Slider from "./Slider.jsx"
import { useNavigate } from "react-router"
import { getHotels } from "../lib/apiClient.js"

const Places = () => {
  const [propertyData, setPropertyData] = useState([])

  useEffect(() => {
    const loadHotelList = async () => {
      try {
        const hotelList = await getHotels()
        setPropertyData(hotelList)
      } catch (error) {
        console.log(error)
      }
    }
    loadHotelList()
  }, [])

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
          {propertyData[0]?.placename}, {propertyData[0]?.address}
        </p>
        <p className="text-red-500 pl-3">{propertyData[0]?.stars}</p>
      </div>
      <p className="label places-price">Rs {propertyData[0]?.price} night</p>
    </div>
  )
}

export default Places
