import React, { useState } from "react"
import store from "../../../../airbnb-data/store.js"

const PropertyPage = () => {
  const [propertyData, setPropertyData] = useState({ store })
  return (
    <div className="flex">
      <div className="flex flex-row flex-wrap">
        <img src={propertyData.store.homeMainPic}></img>
        <img src={propertyData.store.carouselPic1}></img>
        <img src={propertyData.store.carouselPic2}></img>
        <img src={propertyData.store.carouselPic3}></img>
        <img src={propertyData.store.carouselPic4}></img>
        <img src={propertyData.store.carouselPic5}></img>
      </div>
    </div>
  )
}

export default PropertyPage
