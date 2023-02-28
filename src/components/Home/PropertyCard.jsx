import React from "react"
import { Link } from "react-router-dom"
import Loading from "../pages/Loading"
import { Skeleton } from "@chakra-ui/react"

const PropertyCard = ({ listing }) => {
  if (!listing || listing.length === 0) {
    return <Loading />
  }
  return (
    <div className="grid grid-cols-1 grid-rows-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 m-auto pt-5">
      {listing.map((property, i) => (
        <div className="flex flex-row border rounded-lg" key={i}>
          <Link
            to={`/property/${property?.id}`}
            className="flex flex-col flex-auto m-2 hover:cursor-pointer"
            key={i}
          >
            <div className=" w-80 h-60 border rounded-md ">
              <img
                src={property?.imageurl[0]}
                className="border rounded-lg w-80 h-60"
              />
            </div>

            <div className="flex flex-col hover:cursor-pointer p-2">
              <p className="font-bold text-gray-800 w-60 h-6 overflow-hidden">
                {property?.name}
              </p>
              <p className="font-thin text-gray-700 w-60 h-6 overflow-hidden text-sm">
                {property?.address?.location}
              </p>
              <p className="text-slate-900 font-sans italic font-semibold text-sm">
                Rs {property?.price}/Night
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default PropertyCard
