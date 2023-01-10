import React, { useEffect, useState } from "react"
import Reservation from "./Reservation.jsx"
import { getImages, getHotelById } from "../lib/apiClient.js"
import { useNavigate, useParams } from "react-router"

const PropertyPage = () => {
  const [propertyData, setPropertyData] = useState([])
  const [hotelImages, setHotelImages] = useState([])
  const params = useParams()
  const hotelId = params.id

  const loadHotelList = async () => {
    const hotelList = await getHotelById(hotelId)
    setPropertyData(hotelList)
    const loadImageList = await getImages(hotelId)
    const images = loadImageList
    setHotelImages(images)
  }

  useEffect(() => {
    loadHotelList()
  }, [propertyData.id])

  const navigate = useNavigate()

  return (
    <div className="flex flex-col m-auto">
      <div className="flex flex-col  m-3">
        <p className="font-sans font-bold text-lg">
          {propertyData?.name}, {propertyData?.type}
        </p>
        <div className=" flex justify-center w-1/2 ">
          <img src={hotelImages[0]} />
        </div>
        <div className="flex justify-start m-1 ">
          <button
            className="border border-black"
            onClick={() => {
              navigate(`/property_images/${hotelId}`)
            }}
          >
            Show images
          </button>
        </div>
      </div>
      <div className="flex justify-end sticky">
        <Reservation />
      </div>
    </div>
  )
}

export default PropertyPage
