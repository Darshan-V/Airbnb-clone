import React, { useState, useEffect } from "react"
import { getImages } from "../lib/apiClient"

const Slider = (id) => {
  // console.log("🚀 ~ file: Slider.jsx:6 ~ Slider ~ id", id.id)

  const [propertyImages, setPropertyImages] = useState([])

  const loadHotelList = async () => {
    const loadImageList = await getImages(id.id)
    setPropertyImages(loadImageList)
  }

  useEffect(() => {
    loadHotelList()
  }, [id.id])

  return (
    <div className="w-60 h-40 border rounded-md">
      <img src={propertyImages[0]} className="border rounded-md" />
    </div>
  )
}

export default Slider
