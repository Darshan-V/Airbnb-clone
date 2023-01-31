import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { getHotelsByType, getHotels } from "../lib/apiClient.js"
import HomeTab from "./HomeTab.jsx"

const Places = () => {
  const [propertyData, setPropertyData] = useState([])
  const navigate = useNavigate()
  const params = useParams()

  const loadHotelList = async () => {
    if (!params?.type) {
      const defaultView = await getHotels()
      setPropertyData(defaultView)
      navigate(`/home`)
    } else {
      const hotels = await getHotelsByType(params?.type)
      setPropertyData(hotels)
      navigate(`/home/${params?.type}`)
    }
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
    <div className="flex flex-wrap justify-center w-full">
      <div className="flex w-full flex-wrap justify-center m-auto">
        <HomeTab data={propertyData} change={setPropertyData} />
        {propertyData.map((property, i) => (
          <div className="flex flex-row" key={i}>
            <div
              className="flex flex-col flex-auto m-2 "
              key={i}
              onClick={() => {
                navigate(`/property/${property.id}`)
              }}
            >
              <div className=" w-80 h-60 border rounded-md ">
                <img
                  src={propertyData[i]?.imageurl[i]}
                  className="border rounded-lg w-80 h-60"
                />
              </div>

              <div className="flex flex-col hover:cursor-pointer">
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
    </div>
  )
}

export default Places
