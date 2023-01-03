import React, { useEffect, useState } from "react"
import Reservation from "./Reservation.jsx"
import { getHotels, getImages } from "../lib/apiClient.js"
import { useNavigate, useParams } from "react-router"
// import PropertyImages from "./PropertyImages.jsx"

const PropertyPage = () => {
  const [propertyData, setPropertyData] = useState([])
  const [hotelImages, setHotelImages] = useState([])
  const params = useParams()

  const loadHotelList = async () => {
    const hotelList = await getHotels()
    setPropertyData(hotelList)
    const loadImageList = await getImages(params.id)
    const images = loadImageList[0]?.images?.imageUrl
    setHotelImages(images)
  }

  useEffect(() => {
    loadHotelList()
  }, [propertyData.id])

  const navigate = useNavigate()

  return (
    <div className="flex flex-col m-auto">
      <div className="flex flex-col  mt-1">
        <p className="font-sans font-bold text-lg">
          {propertyData[0]?.name},{propertyData[0]?.type}
        </p>
        <div className=" flex justify-center w-1/2 ">
          <img src={hotelImages[0]} />
        </div>
        <div className="flex justify-start m-1 ">
          <button
            className="border border-black"
            onClick={() => {
              navigate(`/property_images/${propertyData[0]?.id}`)
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
