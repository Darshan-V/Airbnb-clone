import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { getHotels } from "../lib/apiClient.js"
import HomeTab from "./HomeTab.jsx"

const Places = () => {
  const [propertyData, setPropertyData] = useState([])
  const navigate = useNavigate()

  const loadHotelList = async () => {
    const hotelList = await getHotels()
    if (hotelList === "unauthorized") {
      navigate("/")
    }
    setPropertyData(hotelList)
  }

  useEffect(() => {
    loadHotelList()
  }, [])

  // const filterPlaces = (type) => {
  //   const filteredPlaces = getHotelsByType()
  //   if (filteredPlaces === "unauthorized") {
  //     navigate("/")
  //   }
  // }

  return (
    <div className="flex flex-wrap justify-center m-auto w-full">
      <HomeTab />
      {propertyData.map((property, i) => (
        <div className="flex flex-row" key={i}>
          <div className="flex flex-col flex-auto m-2 " key={i}>
            <div className=" w-80 h-60 border rounded-md ">
              <img
                src={propertyData[i]?.imageurl[i]}
                className="border rounded-lg w-80 h-60"
              />
            </div>

            <div
              className="flex flex-col hover:cursor-pointer"
              onClick={() => {
                navigate(`/property/${property.id}`)
              }}
            >
              <p className="font-bold text-gray-800 w-60 h-6 overflow-hidden">
                {property?.name}
              </p>
              <p className="font-thin text-gray-700 w-60 h-6 overflow-hidden">
                {property?.address?.location}
              </p>
            </div>
            <p className="label places-price">Rs {property?.price} night</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Places
