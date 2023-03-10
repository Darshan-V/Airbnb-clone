import React from "react"
import { Link } from "react-router-dom"
import { GiTrashCan } from "react-icons/gi"
import { useParams } from "react-router-dom"

const BookingList = ({ bookingData, deleteBooking, hotelId }) => {
  const params = useParams()
  return (
    <>
      {bookingData?.map((reservation, i) => (
        <div key={i}>
          <div className="flex flex-col w-96 mr-auto border m-5 p-5">
            <span>Your Trip</span>
            <Link to={`/property/${hotelId}`}>
              <GiTrashCan
                className="ml-auto hover:cursor-pointer text-red-600 text-xl"
                onClick={() => {
                  console.log("clicked item", i, "will delete this item")
                  deleteBooking(params?.id, "canceled", reservation?.id)
                }}
              />
            </Link>
            <div>
              <div>
                <span className="text text-slate-500 underline uppercase">
                  {reservation?.check_in.substr(0, 10)} to{" "}
                  {reservation?.check_out.substr(0, 10)}
                </span>
              </div>
              <div className="flex flex-row justify-between m-1">
                <p>Status</p>
                <span>{reservation.status}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default BookingList
