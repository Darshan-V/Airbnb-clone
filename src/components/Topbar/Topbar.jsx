import React, { useState } from "react"
import { TbAerialLift, TbSearch } from "react-icons/tb"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { getHotels, searchListing } from "../lib/apiClient"

const Topbar = ({ data, change }) => {
  const [searchedList, setSearchedList] = useState([])
  const params = useParams()

  const searchProperty = async (string) => {
    if (string.length >= 1) {
      const searchedHotels = await searchListing(string)
      setSearchedList(searchedHotels)
    }
  }

  const getAllListing = async () => {
    const listing = await getHotels()
    change(listing)
  }

  const getSearchString = (e) => {
    const str = e.target.value
    searchProperty(str)
    if (str.length === 0) {
      setSearchedList([])
    }
  }

  return (
    <div className="flex justify-between w-full m-auto bg-white-300  sticky top-0 bg-white">
      <Link
        to={"/home"}
        className="flex justify-center mr-auto rounded-lg "
        onClick={getAllListing}
      >
        <TbAerialLift className="text text-6xl font text-yellow-600 hover:text-yellow-400" />
      </Link>
      {params?.id === undefined ? (
        <div className="flex flex-col ml-auto pr-10 pt-5">
          <div className="flex flex-row">
            <TbSearch className="m-auto text-yellow-700 text-3xl font-bold" />

            <div className="m-auto">
              <input
                placeholder="Search destination..."
                className="h-10 w-96 border-2 border-orange-200 border-b-orange-500 focus:outline-none rounded-md "
                onChange={(e) => getSearchString(e)}
              />
            </div>
          </div>
          <div className="flex flex-col sticky top-0 bg-white">
            {searchedList.map((hotelName, i) => (
              <div key={i}>
                <div>{hotelName.name}</div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {params?.id ? (
        <div className="flex flex-row justify-evenly">
          <div className="w-20 m-auto">
            <span>Photos</span>
          </div>
          <div className="w-20 m-auto">
            <span>Reviews</span>
          </div>
          <div className="w-20 m-auto">
            <span>Location</span>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Topbar
