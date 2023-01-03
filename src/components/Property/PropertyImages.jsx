import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import { getImages } from "../lib/apiClient"

const PropertyImages = () => {
  const [hotelImages, setHotelImages] = useState([])
  const params = useParams()

  const loadHotelList = async () => {
    const loadImageList = await getImages(params.id)
    const images = loadImageList[0]?.images?.imageUrl
    setHotelImages(images)
  }

  useEffect(() => {
    loadHotelList()
  }, [])

  return (
    <div>
      <div className="flex flex-col justify-center w-full m-1 ">
        {hotelImages.map((images) => (
          <div className="flex flex-row m-1 ">
            <img src={images} className="w-3/4 h-2/4" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PropertyImages
