import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { getHotels } from "../lib/apiClient.js"

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
  console.log(propertyData[0]?.imageurl[0])

  useEffect(() => {
    loadHotelList()
  }, [])

  return (
    <div className="flex flex-wrap m-auto w-full">
      {propertyData.map((property, i) => (
        <div className="flex flex-row" key={i}>
          <div className="flex flex-col flex-auto  m-5 " key={i}>
            <div className="w-60 h-40 border rounded-md">
              <img
                src={propertyData[i]?.imageurl[i]}
                className="border rounded-md w-60 h-40"
              />
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
        </div>
      ))}
    </div>
  )
}

export default Places
