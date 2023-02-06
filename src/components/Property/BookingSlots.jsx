import React from "react"
import { useSelector } from "react-redux"

const BookingSlots = () => {
  const reservation = useSelector((state) => state.reservation)
  console.log(reservation)
  console.log(localStorage.getItem("reserveData"))
  return (
    <div className="flex ">
      <div className="flex flex-col w-96">
        <div className="m-auto">
          <h1 className="text-slate-800 font-sans font-semibold text-2xl">
            Confirm Booking
          </h1>
        </div>
        <div>
          <div className="flex flex-col w-96 mr-auto border m-5">
            <span>Your Trip</span>
            <div>
              <div>
                <span>Dates</span>
                <p>from-to month</p>
              </div>
            </div>
          </div>
        </div>
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
