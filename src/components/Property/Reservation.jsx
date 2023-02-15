import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { reserveSlot, checkSlots } from "../lib/apiClient"
import { Card, CardHeader, CardBody, Input, Button } from "@chakra-ui/react"
import { useDispatch } from "react-redux"
import { setReservation } from "../../redux/reservationSlice"

const Reservation = ({ price }) => {
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().substring(0, 10)
  )

  const dispatch = useDispatch()

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

  const makeBooking = () => {
    const total = price * nights
    if (isBooked) {
      validateDates(checkIn, checkOut, hotelId)
    }

    dispatch(
      setReservation({
        checkIn: checkIn,
        checkOut: checkOut,
        nights: nights,
        hotelId: hotelId,
        price: price
      })
    )
    console.log(isBooked)
    const status = "reserved"
    reserveSlot(hotelId, checkIn, checkOut, total, status)
    navigate(`/booking/${hotelId}`)
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
    <Card
      w="25rem"
      h="20rem"
      display="flex"
      border="2px"
      position="sticky"
      top="30rem"
      mt="2"
    >
      <CardHeader mr="auto" borderBottom="1px" w="full">
        <span className="text-xl font-mono font-semibold">&#8377; {price}</span>
        <span className="text-md font-mono font-thin">/Night</span>
      </CardHeader>
      <CardBody w="full" m="auto" h="full">
        <div className="flex flex-col w-full">
          <div className="flex flex-row w-full  rounded-lg">
            {checkIn < currentDate ? (
              <div className="w-full flex flex-col h-full border rounded-md border-red-600 bg-red-300">
                <span className="mr-auto text-xs font-mono font-semibold pt-1 pl-1">
                  CheckIn Date
                </span>
                <Input
                  placeholder="Select Checkin Date"
                  size="sm"
                  type="date"
                  value={checkIn}
                  onChange={(e) => {
                    getCheckin(e)
                  }}
                />
              </div>
            ) : (
              <div className="w-full flex flex-col h-full border border-black rounded-md mr-1">
                <span className="mr-auto text-xs font-mono font-semibold pt-1 pl-1">
                  CheckIn Date
                </span>
                <Input
                  placeholder="Select Checkin Date"
                  size="sm"
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
              <div className="w-full flex flex-col h-full border rounded-md border-red-600 bg-red-300">
                <span className="mr-auto text-xs font-mono font-semibold pt-1 pl-1">
                  CheckOut Date
                </span>
                <Input
                  placeholder="Select CheckOut Date"
                  size="sm"
                  type="date"
                  value={checkOut}
                  onChange={(e) => {
                    getCheckout(e)
                  }}
                />
              </div>
            ) : (
              <div className="w-full flex flex-col  border border-black rounded-md h-full ">
                <span className="mr-auto text-xs font-mono font-semibold pt-1 pl-1">
                  CheckOut Date
                </span>
                <Input
                  placeholder="Select CheckOut Date"
                  size="sm"
                  type="date"
                  value={checkOut}
                  onChange={(e) => {
                    getCheckout(e)
                  }}
                />
              </div>
            )}
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
                <span className="text-xs text-red-700 italic">
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
        </div>
        <div className="flex w-full">
          <span className="mr-auto text-slate-800 font-mono font-semibold text-lg">
            Total
          </span>
          <span className="ml-auto text-slate-900 font-mono font-bold text-lg">
            &#8377; {price * nights}
          </span>
        </div>
      </CardBody>
    </Card>
  )
}

export default Reservation
