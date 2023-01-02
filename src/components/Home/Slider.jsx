import React, { useState, useEffect } from "react"
import { getImages } from "../lib/apiClient"

const Slider = (id) => {
  // console.log("🚀 ~ file: Slider.jsx:6 ~ Slider ~ id", id.id)

  const [propertyImages, setPropertyImages] = useState([])

  const loadHotelList = async () => {
    const loadImageList = await getImages(id.id)
    setPropertyImages(loadImageList)
  }

  // console.log(propertyImages)

  useEffect(() => {
    loadHotelList()
  }, [id.id])

  return (
    <div className="flex flex-row">
      <img src={propertyImages[0]?.images?.imageUrl[1]} className="w-60 h-52" />
    </div>
  )
}

export default Slider
