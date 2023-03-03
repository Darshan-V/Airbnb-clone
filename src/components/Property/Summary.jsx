import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getCurrentBooking } from "../lib/apiClient"
import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Button,
  Divider
} from "@chakra-ui/react"
import { Link } from "react-router-dom"

const Summary = () => {
  const params = useParams()
  const bookingId = params.bookingId
  const [userBooking, setUserBooking] = useState([])
  const summary = async () => {
    const booking = await getCurrentBooking(bookingId)
    setUserBooking(booking)
  }

  useEffect(() => {
    summary()
  }, [])

  return (
    <div className="border-8 border-orange-400 h-screen rounded-lg">
      <Card align="center" height="md">
        <CardHeader>
          <Heading size="lg"> Booking Summary</Heading>
        </CardHeader>
        <CardBody w="xl">
          <div className="flex flex-col w-full ">
            <div className="flex text-lg m-auto">
              <span className="font-semibold pr-1">Address:</span>
              <span>{userBooking?.address?.location}</span>
            </div>
            <div className="m-auto pt-2">
              <a
                href={`https://maps.google.com/maps?q=${userBooking?.address?.lat},${userBooking?.address?.long}`}
                className="text-md text-blue-400 underline"
              >
                Click here to navigate
              </a>
            </div>
            <div className="flex flex-col mt-2">
              <div className="flex flex-row w-2/5 justify-between m-auto">
                <span className="text-lg font-bold font-sans">Checkin:</span>
                <span className="text-lg font-medium font-sans italic text-slate-600">
                  {userBooking?.check_in?.slice(0, 10)}
                </span>
              </div>
              <div className="flex flex-row w-2/5 justify-between m-auto">
                <span className="text-lg font-bold font-sans">Checkout:</span>
                <span className="text-lg font-medium font-sans italic text-slate-600">
                  {userBooking?.check_out?.slice(0, 10)}
                </span>
              </div>
              <Divider />
              <div className="flex flex-row w-2/5 justify-between m-auto pt-2">
                <span className="text-lg font-bold font-sans">
                  Amount Paid:
                </span>
                <span className="text-lg font-medium font-sans italic text-slate-600">
                  &#8377; {userBooking?.total_price}
                </span>
              </div>
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <Link to={`/home`}>
            <Button colorScheme="blue">Back to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Summary
