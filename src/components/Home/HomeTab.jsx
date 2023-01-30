import React, { useEffect, useState } from "react"
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

const HomeTab = () => {
  const [data, setData] = useState({ hotels: "", loading: true })

  const getHotelsByHotelType = async (type) => {
    const hotels = await getHotelsByType(type)
    setData({ hotels: hotels, loading: false })
  }
  console.log(data)

  const links = [
    {
      name: "Pool Side",
      icon: (
        <TbPool
          className="text-slate-600 font-light text-3xl"
          onClick={() => {
            getHotelsByHotelType("poolside")
          }}
        />
      )
    },
    {
      name: "Beach Front",
      icon: (
        <TbBeach
          className="text-slate-600 font-light text-3xl"
          onClick={() => {
            getHotelsByHotelType("beachside")
          }}
        />
      )
    },
    {
      name: "Manison",
      icon: (
        <TbBuildingSkyscraper
          className="text-slate-600 font-light text-3xl"
          onClick={() => {
            getHotelsByHotelType("manison")
          }}
        />
      )
    },
    {
      name: "Private Villa",
      icon: (
        <TbBuildingCottage
          className="text-slate-600 font-light text-3xl"
          onClick={() => {
            getHotelsByHotelType("privatevilla")
          }}
        />
      )
    },
    {
      name: "Camping",
      icon: (
        <GiCampingTent
          className="text-slate-600 font-light text-3xl"
          onClick={() => {
            getHotelsByHotelType("camping")
          }}
        />
      )
    },
    {
      name: "Arctic",
      icon: (
        <GiFrozenOrb
          className="text-slate-600 font-light text-3xl"
          onClick={() => {
            getHotelsByHotelType("arctic")
          }}
        />
      )
    },
    {
      name: "Farmhouse",
      icon: (
        <GiFarmTractor
          className="text-slate-600 font-light text-3xl"
          onClick={() => {
            getHotelsByHotelType("farmhouse")
          }}
        />
      )
    },
    {
      name: "Island",
      icon: (
        <GiIsland
          className="text-slate-600 font-light text-3xl"
          onClick={() => {
            getHotelsByHotelType("island")
          }}
        />
      )
    },
    {
      name: "Tropical",
      icon: (
        <GiPalmTree
          className="text-slate-600 font-light text-3xl"
          onClick={() => {
            getHotelsByHotelType("tropical")
          }}
        />
      )
    }
  ]

  return (
    <div className="flex flex-row  justify-center w-full h-16 overflow-auto no-scrollbar sticky top-24 bg-white">
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