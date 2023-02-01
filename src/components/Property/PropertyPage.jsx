import React, { useEffect, useState } from "react"
import Reservation from "./Reservation.jsx"
import { getImages, getHotelById } from "../lib/apiClient.js"
import { useNavigate, useParams } from "react-router"
import ImageCarousel from "./ImageCarousel.jsx"
import AboutProperty from "./AboutProperty.jsx"
import Topbar from "../Topbar/Topbar.jsx"

const PropertyPage = () => {
  const [propertyData, setPropertyData] = useState([])
  const [hotelImages, setHotelImages] = useState([])
  const params = useParams()
  const hotelId = params.id

  const loadHotelList = async () => {
    const hotelList = await getHotelById(hotelId)
    if (hotelList === "unauthorized") navigate("/")
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
    <div className="flex flex-col w-full m-auto">
      <Topbar />
      <div className="flex flex-col w-4/6 m-auto">
        <p className="font-sans font-bold text-lg">
          {propertyData?.name}, {propertyData?.type}
        </p>
        <div className="flex flex-row">
          <div className="m-auto w-full">
            <ImageCarousel images={hotelImages} />
          </div>
        </div>
      </div>
      <div className="flex justify-end sticky top-10">
        <AboutProperty />
        <Reservation price={propertyData?.price} />
      </div>
    </div>
  )
}

export default PropertyPage
