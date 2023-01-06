import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { getHotelById, reserveSlot, validateCheckIn } from "../lib/apiClient"

const Reservation = () => {
  const [hotel, setHotel] = useState([])
  const [checkIn, setCheckin] = useState("")
  const [checkOut, setCheckout] = useState("")
  const [isReserved, setIsReserved] = useState("")

  const navigate = useNavigate()
  const params = useParams()
  const hotelId = params.id
  const userid = params.userid
  const start = new Date(checkIn).getTime()
  const end = new Date(checkOut).getTime()

  const diff = new Date(checkOut).valueOf() - new Date(checkIn).valueOf()
  const diffInHours = diff / 1000 / 60 / 60
  const nights = diffInHours / 24

  const loadHotelList = async () => {
    const hotelList = await getHotelById(hotelId)
    setHotel(hotelList)
  }

  useEffect(() => {
    loadHotelList()
  }, [])

  const makeBooking = () => {
    const total = hotel[0]?.price * nights
    if (start < Date.now() || start >= end) {
      console.log("403 invalid date format")
    } else {
      navigate("/booking")
      reserveSlot(hotelId, checkIn, checkOut, userid, total)
    }
  }

  const getCheckout = (event) => {
    const checkOutDate = event.target.value
    setCheckout(checkOutDate)
  }

  const getCheckin = async (event) => {
    const checkInDate = event.target.value
    const isAvailable = await validateCheckIn(checkInDate, hotelId)
    setIsReserved(isAvailable[0]?.exists)
    if (isAvailable[0]?.exists === true) {
      alert(`Date is already reserved ${checkInDate} select other date`)
    } else {
      setCheckin(checkInDate)
    }
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
                        min={Date.now()}
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
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="ml-auto m-1">
                  <button
                    className="bg-red-600 border rounded-lg w-28 h-8 m-2"
                    onClick={() => {
                      makeBooking()
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
                        Rs {hotel[0]?.price} x {!nights ? 0 : nights}
                      </p>
                      <p>{`${hotel[0]?.price * (!nights ? 0 : nights)}`}</p>
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
