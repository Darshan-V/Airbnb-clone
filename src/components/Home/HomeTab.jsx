import React, { useState } from "react"
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
import FilterListing from "./FilterListing"
import { setType } from "../../store/feature/filter"
import { useSelector, useDispatch } from "react-redux"

const HomeTab = ({ data, setPropertyData }) => {
  const [filteredHotels, setFilteredHotels] = useState([])
  const navigate = useNavigate()
  const params = useParams()
  const dispatchType = useDispatch()

  const links = [
    {
      name: "Pool Side",
      iconName: "poolside",
      icon: (
        <TbPool
          className="text-gray-600 font-light text-3xl"
          onClick={() => {
            dispatchType(setType("poolside"))
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
          className="text-gray-600 font-light text-3xl"
          onClick={() => {
            dispatchType(setType("beachside"))
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
          className="text-gray-600 font-light text-3xl"
          onClick={() => {
            dispatchType(setType("manison"))
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
          className="text-gray-600 font-light text-3xl"
          onClick={() => {
            dispatchType(setType("privatevilla"))
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
          className="text-gray-600 font-light text-3xl"
          onClick={() => {
            dispatchType(setType("camping"))
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
          className="text-gray-600 font-light text-3xl"
          onClick={() => {
            dispatchType(setType("arctic"))
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
          className="text-gray-600 font-light text-3xl"
          onClick={() => {
            dispatchType(setType("farmhouse"))
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
          className="text-gray-600 font-light text-3xl"
          onClick={() => {
            dispatchType(setType("island"))
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
          className="text-gray-600 font-light text-3xl"
          onClick={() => {
            dispatchType(setType("tropical"))
            navigate(`/home/tropical`)
          }}
        />
      )
    }
  ]

  return (
    <div className="flex flex-row justify-center lg:w-full md:w-full sm:w-full h-20 overflow-scroll no-scrollbar sticky top-16 bg-white m-auto">
      {links.map((link, i) => (
        <button key={i} className="flex flex-col w-16 m-auto">
          <div className="flex flex-col m-auto">
            <div className="m-auto">
              <div className="w-full m-auto">{link.icon}</div>
              {params.type === link.iconName ? (
                <div className="text-white w-full text-xs h-4 overflow-hidden bg-pink-500 rounded-sm">
                  <span>{link.name}</span>
                </div>
              ) : (
                <div className="text-slate-600 w-full text-xs h-4 overflow-hidden">
                  <span>{link.name}</span>
                </div>
              )}
            </div>
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
