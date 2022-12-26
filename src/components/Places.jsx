import React, { useState } from "react"
import store from "../../../airbnb-data/store.js"
import Slider from "./Slider.jsx"

const Places = () => {
  const [propertyData, setPropertyData] = useState(store)

  return (
    <div className="div places--home">
      <div className="div places--image--slider">
        <Slider />
      </div>
      <div className="div place--name--address--stars">
        <p className="heading places--home--label">
          {propertyData.name}, {propertyData.location.address}
        </p>
        <p className="label places--stars">{propertyData.stars}</p>
      </div>
      <p className="label places-price">Rs {propertyData.price} night</p>
    </div>
  )
}

export default Places
