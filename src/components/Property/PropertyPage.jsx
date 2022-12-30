import React, { useEffect, useState } from "react"
import { AiFillStar } from "react-icons/ai"
import store from "../../../../airbnb-data/store.js"
import Reservation from "./Reservation.jsx"
import { getHotels, getImages } from "../lib/apiClient.js"

const PropertyPage = () => {
  const [propertyData, setPropertyData] = useState([])
  const [hotelImages, setHotelImages] = useState([])

  useEffect(() => {
    const loadHotelList = async () => {
      const hotelList = await getHotels()
      setPropertyData(hotelList)
      const loadImageList = await getImages(1)
      setHotelImages(loadImageList)
    }
    loadHotelList()
  }, [])

  return (
    <div className="flex flex-col m-auto">
      <div className="flex flex-col flex-wrap mt-1">
        <p className="font-sans font-bold text-lg">
          {propertyData[0]?.placename},{propertyData[0]?.type},{" "}
          {propertyData[0]?.environment}
        </p>
        <div className="flex flex-wrap justify-items-center mt-1 ">
          <span>
            <AiFillStar />
          </span>
          <span>{propertyData[0]?.stars}</span>
        </div>
      </div>
      <div className="flex flex-row justify-center m-0 h-96">
        <img
          src={hotelImages[0]?.homemainpicurl}
          className="w-2/4 h-96 m-1"
        ></img>
        <div className="flex max-w-lg overflow-x-hidden">
          <img
            src={hotelImages[0]?.carouselpic1url}
            className="w-72 h-auto mr-1"
          ></img>
          <img
            src={hotelImages[0]?.carouselpic2url}
            className="w-60 h-auto mr-1"
          ></img>
          <img
            src={hotelImages[0]?.carouselpic3url}
            className="w-auto h-auto mr-1"
          ></img>
          <img
            src={hotelImages[0]?.carouselpic4url}
            className="w-auto h-auto mr-1 "
          ></img>
          <img
            src={hotelImages[0]?.carouselpic5url}
            className="w-auto h-auto mr-1"
          ></img>
        </div>
      </div>
      <Reservation />
    </div>
  )
}

export default PropertyPage
