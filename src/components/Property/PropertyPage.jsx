import React, { useEffect, useState } from "react"
import Reservation from "./Reservation.jsx"
import { getImages, getHotelById } from "../lib/apiClient.js"
import { useNavigate, useParams } from "react-router"

const PropertyPage = () => {
  const [propertyData, setPropertyData] = useState({
    property: "",
    loading: true
  })
  const [hotelImages, setHotelImages] = useState({ images: [], loading: true })
  const params = useParams()
  const hotelId = params.id

  const loadHotelList = async () => {
    const hotelList = await getHotelById(hotelId)
    if (hotelList === "unauthorized") navigate("/")
    setPropertyData({ property: hotelList, loading: false })
    const loadImageList = await getImages(hotelId)
    const images = loadImageList
    setHotelImages({ images: images, loading: false })
  }

  useEffect(() => {
    loadHotelList()
  }, [propertyData.id])

  const navigate = useNavigate()

  return (
    <div className="flex flex-col w-full m-auto">
      <div className="flex flex-col w-4/6 m-auto">
        <p className="font-sans font-bold text-lg">
          {propertyData?.property.name}, {propertyData?.property.type}
        </p>
        <div className="flex flex-col w-full flex-wrap h-96 overflow-hidden no-scrollbar ">
          {hotelImages.images.map((image, i) => (
            <div className="m-1 h-96" key={i}>
              <div>
                <img src={image} className="h-96 w-96" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-start ml-auto ">
          <button
            className=" border-2 border-indigo-200 border-b-indigo-500 rounded-md"
            onClick={() => {
              navigate(`/property_images/${hotelId}`)
            }}
          >
            Show more images
          </button>
        </div>
      </div>
      <div className="flex justify-end sticky top-0">
        <Reservation price={propertyData?.property?.price} />
      </div>
    </div>
  )
}

export default PropertyPage
