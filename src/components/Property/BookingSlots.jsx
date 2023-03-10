import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getBookingsbyProperty } from "../lib/apiClient"
import { useNavigate } from "react-router"
import PlaceSummary from "./PlaceSummary"
import { Button, useToast } from "@chakra-ui/react"
import { updateReservation, getCurrentBooking } from "../lib/apiClient"
import { useDispatch } from "react-redux"
import { setBooking, setBookingId } from "../../store/feature/filter"
import BookingList from "./BookingList"
import ConfirmBookingBtn from "./ConfirmBookingBtn"

const BookingSlots = () => {
  const params = useParams()
  const hotelId = params.id
  const [bookingData, setBookingData] = useState([])
  const navigate = useNavigate()
  const toast = useToast()
  const dispatch = useDispatch()

  const getBookingData = async () => {
    const data = await getBookingsbyProperty(hotelId)
    if (data.length === 0) {
      return navigate(`/property/${hotelId}`)
    }
    setBookingData(data)
  }

  const getCurrentBookingData = async () => {
    const booking = await getCurrentBooking(bookingData[0]?.id)
    if (booking === "unauthorized") {
      return navigate("/")
    }
    dispatch(setBooking(booking))
  }

  useEffect(() => {
    getBookingData()
  }, [params?.id])

  const deleteBooking = async (hotelId, changeStatus, bookingId) => {
    if (!hotelId) {
      return (
        <>
          {toast({
            title: "select a property",
            status: "warning",
            duration: 4000,
            isClosable: true
          })}
        </>
      )
    }
    const updateData = await updateReservation(hotelId, changeStatus, bookingId)
    return (
      <>
        {toast({
          title: "Booking Deleted!",
          status: "warning",
          duration: 4000,
          isClosable: true
        })}
      </>
    )
  }

  const confirmBooking = async (hotelId, changeStatus, bookingId) => {
    if (!hotelId) {
      return (
        <>
          {toast({
            title: "select a property",
            status: "warning",
            duration: 4000,
            isClosable: true
          })}
        </>
      )
    }
    const confirmation = await updateReservation(
      hotelId,
      changeStatus,
      bookingId
    )
    getCurrentBookingData()
    dispatch(setBookingId(bookingData[0]?.id))
    return (
      <>
        {toast({
          title: "changes made!",
          status: "info",
          duration: 4000,
          isClosable: true
        })}
      </>
    )
  }

  return (
    <div className="flex ">
      <div className="flex w-full">
        <div className="flex flex-col w-98">
          <div className="m-auto">
            <h1 className="text-slate-800 font-sans font-semibold text-2xl">
              Confirm Booking
            </h1>
          </div>
          <BookingList
            bookingData={bookingData}
            deleteBooking={deleteBooking}
            hotelId={hotelId}
          />
          <ConfirmBookingBtn
            bookingData={bookingData}
            confirmBooking={confirmBooking}
          />
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
