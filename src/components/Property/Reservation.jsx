import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { reserveSlot, checkSlots } from "../lib/apiClient"

const Reservation = (price) => {
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().substring(0, 10)
  )

  const [checkIn, setCheckin] = useState("")
  const [checkOut, setCheckout] = useState("")
  const [isBooked, setIsBooked] = useState(false)

  const navigate = useNavigate()
  const params = useParams()
  const hotelId = params.id

  const diff = new Date(checkOut).valueOf() - new Date(checkIn).valueOf()
  const diffInHours = diff / 1000 / 60 / 60
  const nights = diffInHours / 24

  const validateDates = async (checkIn, checkOut, hotelId) => {
    const isAvailable = await checkSlots(checkIn, checkOut, hotelId)
    if (isAvailable.length === 0) {
      setIsBooked(false)
    } else {
      setIsBooked(true)
    }
  }

  const makeBooking = () => {
    const total = price.price * nights
    if (
      checkIn < Date.now() ||
      checkIn >= checkOut ||
      checkOut <= checkIn ||
      checkOut <= Date.now()
    ) {
      setIsBooked(true)
    } else {
      validateDates(checkIn, checkOut, hotelId)
      if (isBooked === false) {
        navigate(`/booking/${hotelId}`)
        // reserveSlot(hotelId, checkIn, checkOut, total)
      }
    }
    return <p>slot not available</p>
  }

  const getCheckout = (event) => {
    const checkOutDate = event.target.value
    setCheckout(checkOutDate)
    validateDates(checkIn, checkOutDate, hotelId)
  }

  const getCheckin = async (event) => {
    const checkInDate = event.target.value
    setCheckin(checkInDate)
    if (checkOut) validateDates(checkInDate, checkOut, hotelId)
  }

  return (
    <div className="flex  border border-black justify-center w-96 h-80 sticky top-40">
      <div className="flex mb-auto">
        <div className="flex m-auto ">
          <div className="flex m-auto">
            <div className="flex flex-col justify-center align-middle w-96 m-1">
              <div className="flex flex-col m-1">
                <div className="flex justify-between align-middle">
                  <span className="text-lg m-1 font-sans font-semibold">
                    {price?.price}/night
                  </span>
                  {/* <i className="m-1">{hotel?.stars}</i> */}
                </div>
                <div className="flex flex-col justify-evenly m-1 ">
                  <div className="flex justify-between border-2 mt-auto border-black rounded-md">
                    <div className="border border-black w-1/2">
                      <span>
                        <i className="pl-2">Checkin Date</i>
                      </span>
                      <input
                        type="date"
                        value={checkIn}
                        className="w-full pl-2"
                        min={Date.now()}
                        onChange={(e) => {
                          getCheckin(e)
                        }}
                      />
                      {checkIn <= Date.now() || checkIn > checkOut ? (
                        <p className="text-red-600 text-xs ml-2">
                          Invalid check in date
                        </p>
                      ) : null}
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
                        }}
                      />
                      {checkOut <= checkIn || checkOut <= Date.now() ? (
                        <p className="text-red-600 text-xs ml-2">
                          Invalid check out date
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="m-auto">
                  <button
                    className="bg-red-600 border rounded-lg w-80 h-8 m-3"
                    onClick={() => {
                      makeBooking()
                    }}
                  >
                    Reserve
                  </button>
                </div>
              </div>
              <div className="m-auto">
                {isBooked ? (
                  <div>
                    <span className="text text-red-600">
                      Slot not available
                    </span>
                  </div>
                ) : (
                  <p>You won't be charged yet</p>
                )}
              </div>
              <div className=" m-1 ">
                <section className="calculations sec">
                  <div className="flex flex-col">
                    <div className="flex flex-row justify-between">
                      <p className="underline">
                        Rs {price?.price} x {!nights ? 0 : nights}
                      </p>
                      <p>{`${price?.price * (!nights ? 0 : nights)}`}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="underline">service fee</p>
                      <span>Rs 1000</span>
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
