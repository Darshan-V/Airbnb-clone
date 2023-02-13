import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useGetBookingsQuery } from "../../redux/utils"

const BookingSlots = () => {
  const params = useParams()
  const hotelId = params.id
  const { data } = useGetBookingsQuery(hotelId)
  const [bookingData, setBookingData] = useState([])
  useEffect(() => {
    setBookingData(data)
  }, [data])
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
            <div className="flex flex-col w-96 mr-auto border m-5">
              <span>Your Trip</span>
              <div>
                <div>
                  <span>
                    {reservation?.check_in} to {reservation?.check_out}
                  </span>
                </div>
                <div>
                  <p>Status</p>
                  <span>{reservation.status}</span>
                </div>
                <p>created at {reservation.created_at}</p>
                <p>{Date.now()}</p>
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
      <div className="flex flex-col ml-auto">
        <div>
          <p>Place details</p>
        </div>
        <div>
          <p>Price Details</p>
          <div>
            <span>price x nights</span>
            <span>Total</span>
          </div>
        </div>
        <div>
          <span>Total</span>
          <span>Total Price</span>
        </div>
      </div>
    </div>
  )
}

export default BookingSlots
