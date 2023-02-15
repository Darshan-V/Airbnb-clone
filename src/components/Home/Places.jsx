import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { Link } from "react-router-dom"
import { getHotels, searchListing } from "../lib/apiClient.js"
import HomeTab from "./HomeTab.jsx"
import Topbar from "../Topbar/Topbar"
import Filter from "../pages/Filter.jsx"

const Places = () => {
  const [propertyData, setPropertyData] = useState([])
  const [mapView, setMapView] = useState(false)
  const navigate = useNavigate()
  const params = useParams()

  const loadHotelList = async () => {
    if (params?.type === undefined) {
      const defaultView = await getHotels()
      if (defaultView == "unauthorized") {
        return navigate("/")
      }
      setPropertyData(defaultView)
      navigate(`/home`)
    } else {
      let searchString = "",
        min = 0,
        max = 999999,
        type = params?.type
      const listing = await searchListing(searchString, min, max, type)
      if (listing === "unauthorized") {
        navigate("/")
      } else {
        setPropertyData(listing)
        navigate(`/home/${params?.type}`)
      }
    }
  }

  useEffect(() => {
    loadHotelList()
  }, [])

  return (
    <div className="flex flex-wrap w-full">
      <div className="flex w-full flex-wrap m-auto">
        <Topbar data={propertyData} change={setPropertyData} />
        <HomeTab data={propertyData} change={setPropertyData} />
        {!mapView ? (
          <div className="flex w-full justify-center ">
            <div className="flex flex-row flex-wrap justify-center max-w-screen-3xl">
              {propertyData.map((property, i) => (
                <div className="flex flex-row" key={i}>
                  <Link
                    to={`/property/${property.id}`}
                    className="flex flex-col flex-auto m-2 hover:cursor-pointer"
                    key={i}
                  >
                    <div className=" w-80 h-60 border rounded-md ">
                      <img
                        src={propertyData[i]?.imageurl[0]}
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
                    <p className="label places-price">
                      Rs {property?.price} night
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Filter data={propertyData} />
        )}
      </div>
      {mapView ? (
        <div
          className="flex sticky bottom-10 m-auto w-52 bg-black h-10 rounded-2xl"
          onClick={() => {
            if (mapView === true) {
              setMapView(false)
            } else {
              setMapView(true)
            }
          }}
        >
          <button className="text-white m-auto w-full h-full rounded-2xl">
            Show List
          </button>
        </div>
      ) : (
        <div
          className="flex sticky bottom-10 m-auto w-52 bg-black h-10 rounded-2xl"
          onClick={() => {
            if (mapView === true) {
              setMapView(false)
            } else {
              setMapView(true)
            }
          }}
        >
          <button className="text-white m-auto w-full h-full rounded-2xl">
            Show on Map
          </button>
        </div>
      )}
    </div>
  )
}

export default Places
