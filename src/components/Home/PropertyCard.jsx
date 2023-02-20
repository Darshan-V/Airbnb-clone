import React from "react"
import { Link } from "react-router-dom"

const PropertyCard = ({ listing }) => {
  return (
    <div className="grid grid-cols-1 grid-rows-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 m-auto">
      {listing.map((property, i) => (
        <div className="flex flex-row" key={i}>
          <Link
            to={`/property/${property.id}`}
            className="flex flex-col flex-auto m-2 hover:cursor-pointer"
            key={i}
          >
            <div className=" w-80 h-60 border rounded-md ">
              <img
                src={property?.imageurl[0]}
                className="border rounded-lg w-80 h-60"
              />
            </div>

            <div className="flex flex-col hover:cursor-pointer">
              <p className="font-bold text-gray-800 w-60 h-6 overflow-hidden">
                {property?.name}
              </p>
              <p className="font-thin text-gray-700 w-60 h-6 overflow-hidden">
                {property?.address?.location}
              </p>
            </div>
            <p className="label places-price">Rs {property?.price} night</p>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default PropertyCard
