import React, { useState } from "react"
import store from "../../../../airbnb-data/store.js"
import { AiFillStar } from "react-icons/ai"

const PropertyPage = () => {
  const [propertyData, setPropertyData] = useState({ store })
  return (
    <div className="flex flex-col m-auto">
      <div className="flex flex-col flex-wrap mt-1">
        <p className="font-sans font-bold text-lg">
          {propertyData.store.name},{propertyData.store.type},{" "}
          {propertyData.store.view}
        </p>
        <div className="flex flex-wrap justify-items-center mt-1 ">
          <span>
            <AiFillStar />
          </span>
          <span>{propertyData.store.stars}</span>
        </div>
      </div>
      <div className="flex flex-row justify-center m-0 h-96">
        <img
          src={propertyData.store.homeMainPic}
          className="w-2/4 h-96 m-1"
        ></img>
        <div className="flex max-w-lg overflow-x-hidden">
          <img
            src={propertyData.store.carouselPic1}
            className="w-56 h-auto mr-1"
          ></img>
          <img
            src={propertyData.store.carouselPic2}
            className="w-auto h-auto mr-1"
          ></img>
          <img
            src={propertyData.store.carouselPic5}
            className="w-auto h-auto mr-1"
          ></img>
          <img
            src={propertyData.store.carouselPic4}
            className="w-auto h-auto mr-1 "
          ></img>
          <img
            src={propertyData.store.carouselPic3}
            className="w-auto h-auto mr-1"
          ></img>
        </div>
      </div>
    </div>
  )
}

export default PropertyPage
