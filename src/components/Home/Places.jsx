import React, { useEffect, useState } from "react"
import {
  useNavigate,
  useParams
} from "react-router"
import {
  getHotels,
  searchListing
} from "../lib/apiClient.js"
import HomeTab from "./HomeTab.jsx"
import Topbar from "../Topbar/Topbar"
import Filter from "../pages/Filter.jsx"
import PropertyCard from "./PropertyCard.jsx"
import Loading from "../pages/Loading.jsx"

const Places = () => {
  const [propertyData, setPropertyData] =
    useState([])
  const [userId, setUserId] = useState("")
  const [mapView, setMapView] = useState(false)
  const navigate = useNavigate()
  const params = useParams()

  const loadHotelList = async () => {
    if (params?.type === undefined) {
      const [defaultView, userId] =
        await getHotels()
      if (defaultView === "u") {
        return navigate("/")
      }
      setPropertyData(defaultView)
      setUserId(userId)
      navigate(`/home`)
    } else {
      let searchString = "",
        min = 0,
        max = 999999,
        type = params?.type
      const listing = await searchListing(
        searchString,
        min,
        max,
        type
      )
      if (listing === "u") {
        navigate("/")
      } else {
        setPropertyData(listing)
        navigate(`/home/${params?.type}`)
      }
    }
  }
  useEffect(() => {
    loadHotelList()
  }, [params.type])

  if (
    !propertyData ||
    propertyData.length === 0
  ) {
    return <Loading />
  }

  return (
    <div className="flex flex-wrap w-full">
      <div className="flex w-full flex-wrap ">
        <Topbar
          data={propertyData}
          setPropertyData={setPropertyData}
          userId={userId}
        />
        <HomeTab
          data={propertyData}
          setPropertyData={setPropertyData}
        />
        {!mapView ? (
          <div className="flex w-full">
            <PropertyCard
              listing={propertyData}
            />
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
