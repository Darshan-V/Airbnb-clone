import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getBookingsbyProperty } from "../lib/apiClient"
import { useNavigate } from "react-router"
import { GiTrashCan } from "react-icons/gi"
import PlaceSummary from "./PlaceSummary"
import { Button } from "@chakra-ui/react"

const BookingSlots = () => {
  const params = useParams()
  const hotelId = params.id
  const [bookingData, setBookingData] = useState([])
  const navigate = useNavigate()

  const getBookingData = async () => {
    const data = await getBookingsbyProperty(hotelId)
    if (data.length === 0) {
      return navigate(`/property/${hotelId}`)
    }
    setBookingData(data)
  }

  useEffect(() => {
    getBookingData()
  }, [])

  //   const deleteSlotHandler=()=>{}

  return (
    <div className="flex ">
      <div className="flex w-full">
        <div className="flex flex-col w-98">
          <div className="m-auto">
            <h1 className="text-slate-800 font-sans font-semibold text-2xl">
              Confirm Booking
            </h1>
          </div>
          {bookingData?.map((reservation, i) => (
            <div key={i}>
              <div className="flex flex-col w-96 mr-auto border m-5 p-5">
                <span>Your Trip</span>
                <GiTrashCan
                  className="ml-auto hover:cursor-pointer text-red-600 text-xl"
                  onClick={() => {
                    console.log("clicked item", i, "will delete this item")
                  }}
                />
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
          <div
            className="flex m-auto w-4/5 h-10 rounded-md hover:cursor-pointer hover:scale-110 hover:bg-pink-500"
            onClick={() => {
              if (bookingData.length === 1) {
                return console.log("booking confirmed")
              }
              console.log(
                "multiple slots selected edit selection before confirmation"
              )
            }}
          >
            {bookingData.length > 1 ? (
              <Button isDisabled w="full" colorScheme="pink">
                Continue
              </Button>
            ) : (
              <Button w="full" colorScheme="pink">
                Continue
              </Button>
            )}
          </div>
        </div>
        {bookingData.length > 1 ? null : (
          <div className="m-auto w-2/6 h-auto">
            <PlaceSummary data={bookingData} />
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingSlots
