import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getBookingsbyProperty } from "../lib/apiClient"
import { useNavigate } from "react-router"
import { GiTrashCan } from "react-icons/gi"

const BookingSlots = () => {
  const params = useParams()
  const hotelId = params.id
  const [bookingData, setBookingData] = useState(
    []
  )
  const navigate = useNavigate()

  const getBookingData = async () => {
    const data = await getBookingsbyProperty(
      hotelId
    )
    if (data.length === 0) {
      return navigate(`/property/${hotelId}`)
    }
    setBookingData(data)
  }

  useEffect(() => {
    getBookingData()
  }, [hotelId])

  console.log(bookingData)
  return (
    <div className="flex ">
      <div className="flex flex-col w-96">
        <div className="m-auto">
          <h1 className="text-slate-800 font-sans font-semibold text-2xl">
            Confirm Booking
          </h1>
        </div>
        {bookingData?.map((reservation, i) => (
          <div key={i}>
            <div className="flex flex-col w-96 mr-auto border m-5 p-5">
              <span>Your Trip</span>
              <GiTrashCan className="ml-auto hover:cursor-pointer text-red-600 text-xl" />
              <div>
                <div>
                  <span className="text text-slate-500 underline uppercase">
                    {reservation?.check_in.substr(
                      0,
                      10
                    )}{" "}
                    to{" "}
                    {reservation?.check_out.substr(
                      0,
                      10
                    )}
                  </span>
                </div>
                <div className="flex flex-row justify-between m-1">
                  <p>Status</p>
                  <span>
                    {reservation.status}
                  </span>
                </div>
                <p>
                  created at{" "}
                  {reservation.created_at.substr(
                    11
                  )}
                </p>
                {/* <p>{Date.now()}</p> */}
              </div>
              <div className="flex justify-between">
                <span>Total</span>
                <span>
                  Rs {reservation.total_price}
                </span>
              </div>
            </div>
          </div>
        ))}
        <div className="flex m-auto w-4/5 bg-pink-600 h-10 rounded-md">
          <button className="w-84 bg-pink-600 m-auto text-white text-semibold text-xl font-mono">
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookingSlots
