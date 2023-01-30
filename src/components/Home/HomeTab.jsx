import React from "react"
import {
  TbPool,
  TbBeach,
  TbBuildingSkyscraper,
  TbBuildingCottage
} from "react-icons/tb"
import {
  GiCampingTent,
  GiFrozenOrb,
  GiFarmTractor,
  GiIsland,
  GiPalmTree
} from "react-icons/gi"

const HomeTab = () => {
  const links = [
    { name: "Pool Side", icon: <TbPool /> },
    { name: "Beach Front", icon: <TbBeach /> },
    { name: "Manison", icon: <TbBuildingSkyscraper /> },
    { name: "Cottage", icon: <TbBuildingCottage /> },
    { name: "Camping", icon: <GiCampingTent /> },
    { name: "Arctic", icon: <GiFrozenOrb /> },
    { name: "Farmhouse", icon: <GiFarmTractor /> },
    { name: "Island", icon: <GiIsland /> },
    { name: "Tropical", icon: <GiPalmTree /> }
  ]

  return (
    <div className="flex flex-row justify-center w-full h-12 overflow-scroll no-scrollbar">
      <div className="flex flex-row">
        {links.map((link, i) => (
          <div key={i}>
            <div>{link.icon}</div>
            <span>
              <a>{link.name}</a>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeTab
