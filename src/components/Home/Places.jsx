import React, { useEffect, useState } from "react"
import Slider from "./Slider.jsx"
import { useNavigate } from "react-router"
import { getHotels } from "../lib/apiClient.js"

const Places = () => {
  const [propertyData, setPropertyData] = useState([])

  const loadHotelList = async () => {
    const hotelList = await getHotels()
    setPropertyData(hotelList)
  }

  useEffect(() => {
    loadHotelList()
  }, [propertyData.id])

  const navigate = useNavigate()

  return (
    <div className="flex flex-row">
      {propertyData.map((property, i) => (
        <>
          <div className="flex flex-col flex-auto m-5 ">
            <div className="flex">
              <Slider id={property.id} />
            </div>

            <div
              className="flex flex-row hover:cursor-pointer"
              onClick={() => {
                navigate(`/property/${property.id}`)
              }}
            >
              <p className="font-thin text-gray-800 w-60 h-12 overflow-hidden">
                {property?.name}, {property?.address?.location}
              </p>
            </div>
            <p className="label places-price">Rs {property?.price} night</p>
          </div>
        </>
      ))}
    </div>
  )
}

export default Places
