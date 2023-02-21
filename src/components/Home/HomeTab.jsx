import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import {
  TbPool,
  TbBeach,
  TbBuildingSkyscraper,
  TbBuildingCottage,
  TbFilter
} from "react-icons/tb"
import {
  GiCampingTent,
  GiFrozenOrb,
  GiFarmTractor,
  GiIsland,
  GiPalmTree
} from "react-icons/gi"
import { searchListing } from "../lib/apiClient"
import FilterListing from "./FilterListing"

const HomeTab = ({ data, setPropertyData }) => {
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(9999999)
  const [filteredHotels, setFilteredHotels] = useState([])
  const [type, setType] = useState("")
  const navigate = useNavigate()
  const params = useParams()

  const getHotelsByHotelType = async (hotelType) => {
    let searchString = ""
    let min = minPrice
    let max = maxPrice
    hotelType = type
    let hotels = await searchListing(searchString, min, max, hotelType)
    setType(hotelType)
    setPropertyData(hotels)
  }

  const links = [
    {
      name: "Pool Side",
      iconName: "poolside",
      icon: (
        <TbPool
          className="text-orange-600 font-light text-3xl"
          onClick={() => {
            getHotelsByHotelType("poolside")
            navigate(`/home/poolside`)
          }}
        />
      )
    },
    {
      name: "Beach Side",
      iconName: "beachside",
      icon: (
        <TbBeach
          className="text-orange-600 font-light text-3xl"
          onClick={() => {
            getHotelsByHotelType("beachside")
            navigate(`/home/beachside`)
          }}
        />
      )
    },
    {
      name: "Manison",
      iconName: "manison",
      icon: (
        <TbBuildingSkyscraper
          className="text-orange-600 font-light text-3xl"
          onClick={() => {
            getHotelsByHotelType("manison")
            navigate(`/home/manison`)
          }}
        />
      )
    },
    {
      name: "Private Villa",
      iconName: "privatevilla",
      icon: (
        <TbBuildingCottage
          className="text-orange-600 font-light text-3xl"
          onClick={() => {
            getHotelsByHotelType("privatevilla")
            navigate(`/home/privatevilla`)
          }}
        />
      )
    },
    {
      name: "Camping",
      iconName: "camping",
      icon: (
        <GiCampingTent
          className="text-orange-600 font-light text-3xl"
          onClick={() => {
            getHotelsByHotelType("camping")
            navigate(`/home/camping`)
          }}
        />
      )
    },
    {
      name: "Arctic",
      iconName: "arctic",
      icon: (
        <GiFrozenOrb
          className="text-orange-600 font-light text-3xl"
          onClick={() => {
            getHotelsByHotelType("arctic")
            navigate(`/home/arctic`)
          }}
        />
      )
    },
    {
      name: "Farmhouse",
      iconName: "farmhouse",
      icon: (
        <GiFarmTractor
          className="text-orange-600 font-light text-3xl"
          onClick={() => {
            getHotelsByHotelType("farmhouse")
            navigate(`/home/farmhouse`)
          }}
        />
      )
    },
    {
      name: "Island",
      iconName: "island",
      icon: (
        <GiIsland
          className="text-orange-600 font-light text-3xl"
          onClick={() => {
            getHotelsByHotelType("island")
            navigate(`/home/island`)
          }}
        />
      )
    },
    {
      name: "Tropical",
      iconName: "tropical",
      icon: (
        <GiPalmTree
          className="text-orange-600 font-light text-3xl"
          onClick={() => {
            getHotelsByHotelType("tropical")
            navigate(`/home/tropical`)
          }}
        />
      )
    }
  ]

  return (
    <div className="flex flex-row  justify-center w-full h-20 overflow-auto no-scrollbar sticky top-16 bg-orange-50 m-auto">
      {links.map((link, i) => (
        <button key={i} className="flex flex-col w-16 m-auto">
          <div className="flex flex-col m-auto">
            <span className="m-auto">
              <div className="w-full m-auto">{link.icon}</div>
              {params.type === link.iconName ? (
                <div className="text-white w-full text-xs h-4 overflow-hidden bg-orange-500 rounded-sm">
                  <span>{link.name}</span>
                </div>
              ) : (
                <div className="text-slate-600 w-full text-xs h-4 overflow-hidden">
                  <span>{link.name}</span>
                </div>
              )}
            </span>
          </div>
        </button>
      ))}
      <FilterListing
        setPropertyData={setPropertyData}
        setFilteredHotels={setFilteredHotels}
      />
    </div>
  )
}

export default HomeTab
