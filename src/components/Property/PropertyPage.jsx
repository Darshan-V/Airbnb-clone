import React, { useEffect, useState } from "react"
import Reservation from "./Reservation.jsx"
import { getImages, getHotelById } from "../lib/apiClient.js"
import { useNavigate, useParams } from "react-router"
import ImageCarousel from "./ImageCarousel.jsx"
import AboutProperty from "./AboutProperty.jsx"
import Topbar from "../Topbar/Topbar.jsx"
import Loading from "../pages/Loading.jsx"

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
  if (!propertyData || propertyData.length === 0) {
    return <Loading />
  }
  return (
    <div className="flex flex-col w-3/4 m-auto">
      <Topbar />
      <div className="flex flex-col w-full m-auto pt-4">
        <p className="font-sans font-bold text-2xl  mr-auto">
          {propertyData?.name}, {propertyData?.type?.toUpperCase()}
        </p>

        <div className="flex pt-4 pb-4 ">
          <div className="flex flex-row "></div>
          <div className=" w-full">
            <ImageCarousel images={hotelImages} />
          </div>
        </div>
      </div>
      <div className="flex justify-end sticky border-t-2 mt-3 top-10">
        <AboutProperty data={propertyData} />
        <Reservation price={propertyData?.price} />
      </div>
    </div>
  )
}

export default PropertyPage
