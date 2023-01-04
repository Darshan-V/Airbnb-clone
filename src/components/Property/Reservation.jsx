import { check } from "prettier"
import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { getHotels, reserveSlot } from "../lib/apiClient"

const Reservation = () => {
  const [hotel, setHotel] = useState([])
  const [checkIn, setCheckin] = useState("")
  const [checkOut, setCheckout] = useState("")
  const [nightsNumber, setNights] = useState("")
  const navigate = useNavigate()
  const params = useParams()
  const hotelId = params.id
  const userid = params.userid
  const start = new Date(checkIn).getTime()
  const end = new Date(checkOut).getTime()

  console.log(new Date(checkIn))

  useEffect(() => {
    const loadHotelList = async () => {
      const hotelList = await getHotels()
      setHotel(hotelList)
    }
    loadHotelList()
  }, [])

  const makeBooking = () => {
    const total = hotel[0]?.price
    if (start > end || start) reserveSlot(hotelId, start, end, userid, total)
  }

  const getCheckout = (event) => {
    const checkOutDate = event.target.value
    setCheckout(checkOutDate)
  }

  const getCheckin = (event) => {
    const checkInDate = event.target.value
    setCheckin(checkInDate)
  }

  const countNights = (checkInDate, checkOutDate) => {
    checkInDate = checkIn
    checkOutDate = checkOut
    let res = new Date(checkInDate) - new Date(checkOutDate)
    if (res < 0) res = -res
    const nights = res / 1000 / 3600 / 24
    setNights(nights)
    console.log(nights)
  }

  //TODO date validation checkin

  return (
    <div className="flex  border border-black  justify-center mt-4 w-96 sticky">
      <div className="flex m-auto">
        <div className="flex m-auto ">
          <div className="flex m-auto">
            <div className="flex flex-col justify-center align-middle w-96 m-1">
              <div className="flex flex-col m-1">
                <div className="flex justify-between align-middle">
                  <span className="text-lg m-1 font-sans font-semibold">
                    {hotel[0]?.price} night
                  </span>
                  <i className="m-1">{hotel[0]?.stars}</i>
                </div>
                <div className="flex flex-col justify-evenly m-1 ">
                  <div className="flex justify-between border-2 border-black rounded-md">
                    <div className="border border-black w-1/2">
                      <span>
                        <i className="pl-2">Checkin Date</i>
                      </span>
                      <input
                        type="date"
                        value={checkIn}
                        className="w-full pl-2"
                        onChange={(e) => {
                          getCheckin(e)
                        }}
                      />
                    </div>
                    <div className="border border-black w-1/2">
                      <span>
                        <i className="pl-2">Checkout Date</i>
                      </span>
                      <input
                        type="date"
                        value={checkOut}
                        className="w-full pl-2"
                        onChange={(e) => {
                          getCheckout(e)
                          countNights()
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="ml-auto m-1">
                  <button
                    className="bg-red-600 border rounded-lg w-28 h-8 m-2"
                    onClick={() => {
                      checkIn.length !== 0 && checkOut.length !== 0 ? (
                        (makeBooking(), navigate("/booking"))
                      ) : (
                        <p className="text text-red-600 ">
                          Select Checkin and Checkout
                        </p>
                      )
                    }}
                  >
                    Reserve
                  </button>
                </div>
              </div>
              <ul className="m-auto">
                <li>You won't be charged yet</li>
              </ul>
              <div className=" m-1 ">
                <section className="calculations sec">
                  <div className="flex flex-col">
                    <div className="flex flex-row justify-between">
                      <p className="underline">
                        Rs {hotel[0]?.price} x {nightsNumber}
                      </p>
                      <p>{`${hotel[0]?.price * nightsNumber}`}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="underline">service fee</p>
                      <span>Rs 0</span>
                    </div>
                  </div>
                  <div className="total before taxes"></div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reservation
