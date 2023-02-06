import React from "react"
import { Marker, Popup, TileLayer, MapContainer, Tooltip } from "react-leaflet"
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import "./leaflet.css"
import { Icon } from "leaflet"
import { useNavigate } from "react-router"

const Filter = ({ data }) => {
  const defaultCenter = [32.55896, 76.97293]
  const navigate = useNavigate()

  return (
    <div className="w-full">
      <MapContainer
        center={defaultCenter}
        zoom={5}
        scrollWheelZoom={false}
        doubleClickZoom
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((property, i) => (
          <Marker
            position={[property?.address?.lat, property?.address?.long]}
            icon={
              new Icon({
                iconUrl: markerIconPng,
                iconSize: [20, 30],
                iconAnchor: [12, 42]
              })
            }
            key={i}
          >
            <Popup>
              <div className="flex flex-row w-auto ">
                <div className="mr-auto rounded-xl">
                  <img
                    src={property?.imageurl[0]}
                    className="w-20 h-20 rounded-xl m-auto hover:cursor-pointer"
                    onClick={() => {
                      navigate(`/property/${property.id}`)
                    }}
                  />
                </div>
                <div className="flex flex-col m-1 w-15">
                  <span className="text-sm text-slate-700 font-semibold">
                    {property?.name}
                  </span>
                  <div className="m-auto">
                    <span className="text-slate-600 text-xs font-bold">
                      Rs {property?.price} / Night
                    </span>
                  </div>
                </div>
              </div>
            </Popup>
            <Tooltip>
              <div className="flex flex-col">
                <span className="text-sm font-bold">{property?.name}</span>
                <span className="text-xs text-slate-700">
                  Rs {property?.price} / Night
                </span>
              </div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default Filter
