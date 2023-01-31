import React, { useState } from "react"
import { useNavigate } from "react-router"
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
import { getHotelsByType } from "../lib/apiClient"

const HomeTab = ({ data, change }) => {
  const [hotelData, setHotelData] = useState([])
  const navigate = useNavigate()

  const getHotelsByHotelType = async (type) => {
    const hotels = await getHotelsByType(type)
    change(hotels)
    setHotelData(hotels)
  }

  const links = [
    {
      name: "Pool Side",
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
      name: "Beach Front",
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
    <div className="flex flex-row  justify-center w-full h-16 overflow-auto no-scrollbar sticky top-14 bg-white">
      {links.map((link, i) => (
        <button key={i} className="flex flex-col w-16 m-auto">
          <div className="flex flex-col m-auto">
            <span className="m-auto">
              <div className="w-full m-auto">{link.icon}</div>
              <div className="text-slate-600 w-full text-xs h-4 overflow-hidden">
                {link.name}
              </div>
            </span>
          </div>
        </button>
      ))}
      <div className="flex flex-col w-24 m-auto border border-slate-400 rounded-md">
        <TbFilter className="text-black font-bold text-3xl m-auto" />
        <span className="text text-slate-600 text-sm font-serif italic m-auto">
          Filter
        </span>
      </div>
    </div>
  )
}

export default HomeTab
