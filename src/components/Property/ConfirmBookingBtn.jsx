import React from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { Button } from "@chakra-ui/react"

const ConfirmBookingBtn = ({ bookingData, confirmBooking }) => {
  const params = useParams()
  return (
    <>
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
          <Link to={`/summary/${bookingData[0]?.id}`} className="w-full">
            <Button
              w="full"
              colorScheme="pink"
              onClick={() => {
                confirmBooking(params?.id, "confirmed", bookingData[0]?.id)
              }}
            >
              Continue
            </Button>
          </Link>
        )}
      </div>
    </>
  )
}

export default ConfirmBookingBtn
