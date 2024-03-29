import React, { useState } from "react"
import { useNavigate, useParams } from "react-router"
import { reserveSlot, checkSlots } from "../lib/apiClient"
import { Card, CardHeader, CardBody, Input, Button } from "@chakra-ui/react"

const Reservation = ({ price }) => {
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
      return setIsBooked(false)
    } else {
      return setIsBooked(true)
    }
  }

  const makeBooking = async () => {
    const total = price * nights
    if (isBooked) {
      await validateDates(checkIn, checkOut, hotelId)
    } else {
      const status = "reserved"
      const reservation = await reserveSlot(
        hotelId,
        checkIn,
        checkOut,
        total,
        status
      )
      navigate(`/bookings/${hotelId}`)
      return reservation
    }
  }

  const getCheckout = async (event) => {
    const checkOutDate = event.target.value
    setCheckout(checkOutDate)
    await validateDates(checkIn, checkOutDate, hotelId)
  }
  const getCheckin = async (event) => {
    const checkInDate = event.target.value
    setCheckin(checkInDate)

    if (checkOut) await validateDates(checkInDate, checkOut, hotelId)
  }

  const minDate = () => {
    const today = new Date().toISOString().split('T')[0];
    return today;
};

  return (
    <Card
      w="25rem"
      h="20rem"
      display="flex"
      border="2px"
      position="sticky"
      top="10rem"
      mt="2"
    >
      <CardHeader mr="auto" borderBottom="1px" w="full" display="flex">
        <span className="text-xl font-mono font-semibold">&#8377; {price}</span>
        <span className="text-md font-mono font-thin">/Night</span>
      </CardHeader>
      <CardBody w="full" m="auto" h="full">
        <div className="flex flex-col w-full">
          <div className="flex flex-row w-full  rounded-lg">
            <div className="flex flex-row w-full">
              {checkIn < currentDate ? (
                <div className="w-full flex flex-col h-full border rounded-md border-red-600 bg-red-300 sm:w-2/5 md:w-1/2 lg:w-full m-auto">
                  <span className="mr-auto text-xs font-mono font-semibold pt-1 pl-1">
                    CheckIn Date
                  </span>
                  <Input
                    placeholder="Select Checkin Date"
                    type="date"
                    min={minDate()}
                    value={checkIn}
                    onChange={(e) => {
                      getCheckin(e)
                    }}
                  />
                </div>
              ) : (
                <div className="w-full flex flex-col h-full border border-black rounded-md mr-1 sm:w-2/5 md:w-1/2 lg:w-full m-auto">
                  <span className="mr-auto text-xs font-mono font-semibold pt-1 pl-1">
                    CheckIn Date
                  </span>
                  <Input
                    placeholder="Select Checkin Date"
                    type="date"
                    value={checkIn}
                    borderTop="1px"
                    onChange={(e) => {
                      getCheckin(e)
                    }}
                  />
                </div>
              )}
              {checkOut <= currentDate || checkOut <= checkIn ? (
                <div className="w-full flex flex-col h-full border rounded-md border-red-600 bg-red-300 sm:w-2/5 md:w-1/2 lg:w-full m-auto">
                  <span className="mr-auto text-xs font-mono font-semibold pt-1 pl-1 ">
                    CheckOut Date
                  </span>
                  <Input
                    placeholder="Select CheckOut Date"
                    type="date"
                    value={checkOut}
                    onChange={(e) => {
                      getCheckout(e)
                    }}
                  />
                </div>
              ) : (
                <div className="w-full flex flex-col  border border-black rounded-md h-full sm:w-2/5 md:w-1/2 lg:w-full m-auto">
                  <span className="mr-auto text-xs font-mono font-semibold pt-1 pl-1">
                    CheckOut Date
                  </span>
                  <Input
                    placeholder="Select CheckOut Date"
                    type="date"
                    value={checkOut}
                    onChange={(e) => {
                      getCheckout(e)
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="w-full m-1">
            {isBooked ||
            checkIn < currentDate ||
            checkOut <= checkIn ||
            checkOut <= currentDate ? (
              <div className="mt-4">
                <Button colorScheme="red" isDisabled w="full">
                  Reserve
                </Button>
                <span className="text-xs text-red-400 italic">
                  *Invalid Date
                </span>
              </div>
            ) : (
              <div className="mt-4">
                <Button
                  colorScheme="red"
                  m="auto"
                  w="full"
                  onClick={makeBooking}
                >
                  Reserve
                </Button>
              </div>
            )}
          </div>
          {isBooked ? (
            <p className="text-red text-sm italic font-sans font-thin">
              *Slot not available
            </p>
          ) : null}
          {isBooked ||
          checkIn < currentDate ||
          checkOut <= checkIn ||
          checkOut <= currentDate ? (
            <p className="text font-sans italic text-md text-red-800">
              Check the check in and check out or, the slot may not be available
            </p>
          ) : (
            <div className="flex flex-col w-full mt-4">
              <div className="flex flex-row ">
                <span className="mr-auto text-slate-600 font-mono font-semibold">
                  &#8377;{price} x {nights}
                </span>
                <span className="ml-auto text-slate-700 font-mono font-bold">
                  &#8377;{price * nights}
                </span>
              </div>
            </div>
          )}
        </div>
        {isBooked ||
        checkIn < currentDate ||
        checkOut <= checkIn ||
        checkOut <= currentDate ? null : (
          <div className="flex w-full">
            <span className="mr-auto text-slate-800 font-mono font-semibold text-lg">
              Total
            </span>
            <span className="ml-auto text-slate-900 font-mono font-bold text-lg">
              &#8377; {price * nights}
            </span>
          </div>
        )}
      </CardBody>
    </Card>
  )
}

export default Reservation
