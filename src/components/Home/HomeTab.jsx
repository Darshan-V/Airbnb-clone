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
import Popup from "reactjs-popup"
import { filterByPrice, getHotelsByType } from "../lib/apiClient"

const HomeTab = ({ data, change }) => {
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  const navigate = useNavigate()
  const params = useParams()

  const getHotelsByHotelType = async (type) => {
    const hotels = await getHotelsByType(type)
    change(hotels)
  }

  const filterHotelsbyPrice = async (min, max) => {
    const hotels = await filterByPrice(min, max)
    // console.log(hotels)
    change(hotels)
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
    <div className="flex flex-row  justify-center w-full h-16 overflow-auto no-scrollbar sticky top-14 bg-white">
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
      <div className="flex flex-col w-24 m-auto border border-slate-400 rounded-md">
        <Popup
          trigger={
            <button className="text text-slate-600 text-sm font-serif italic h-10 w-full m-auto ">
              Filter
            </button>
          }
          modal
          nested
        >
          {(close) => (
            <div className="flex flex-col bg-slate-300 w-full">
              <button className="ml-auto w-5 h-5" onClick={close}>
                &times;
              </button>
              <div className="m-auto">
                <span className="text text-md font-sans font-semibold text-slate-600">
                  Price Range
                </span>
              </div>
              <div className="flex flex-row m-2">
                <div className="mr-auto w-48 p-2">
                  <input
                    placeholder="min"
                    className="w-full h-full p-1 rounded-md"
                    onChange={(e) => {
                      setMinPrice(e.target.value)
                    }}
                  />
                </div>
                <div className="mr-auto w-48 p-2">
                  <input
                    placeholder="max"
                    className="w-full h-full p-1 rounded-md"
                    onChange={(e) => {
                      setMaxPrice(e.target.value)
                    }}
                  />
                </div>
              </div>
              <div className="actions">
                <Popup position="top center" nested>
                  <span></span>
                </Popup>
                <button
                  className="button"
                  onClick={() => {
                    filterHotelsbyPrice(minPrice, maxPrice)
                    close()
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </div>
  )
}

export default HomeTab
