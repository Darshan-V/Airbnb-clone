import React, { useState, useEffect } from "react"
import { getHotels, reserveSlot } from "../lib/apiClient"

const Reservation = () => {
  const [hotel, setHotel] = useState([])
  const [checkIn, setCheckin] = useState([])
  const [checkOut, setCheckout] = useState([])

  useEffect(() => {
    const loadHotelList = async () => {
      const hotelList = await getHotels()
      setHotel(hotelList)
    }
    loadHotelList()
  }, [])

  const makeBooking = () => {
    const hotelId = hotel[0].placeid
    const checkInDate = checkIn
    const checkOutDate = checkOut
    const userId = 1
    const bookingStatus = true
    reserveSlot(hotelId, checkInDate, checkOutDate, bookingStatus, userId)
  }

  const getCheckout = (event) => {
    const checkOutDate = event.target.value
    setCheckout(checkOutDate)
  }

  const getCheckin = (event) => {
    const checkInDate = event.target.value
    setCheckin(checkInDate)
  }

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
                        <i>Checkin Date</i>
                      </span>
                      <input
                        type="date"
                        value={checkIn}
                        className="w-full"
                        onChange={(e) => {
                          getCheckin(e)
                        }}
                      />
                    </div>
                    <div className="border border-black w-1/2">
                      <span>
                        <i>Checkout Date</i>
                      </span>
                      <input
                        type="date"
                        value={checkOut}
                        className="w-full"
                        onChange={(e) => {
                          getCheckout(e)
                        }}
                      />
                    </div>
                  </div>
                  {/* <div className="border border-black rounded-md">
                    <p>Select guests</p>
                  </div> */}
                </div>
                <div className="ml-auto m-1">
                  <button
                    className="bg-red-600 border rounded-lg w-28 h-8 m-2"
                    onClick={() => makeBooking()}
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
                      <p className="underline">Rs {hotel[0]?.price} x 2</p>
                      <span>{`${hotel[0]?.price * 2} `}</span>
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
