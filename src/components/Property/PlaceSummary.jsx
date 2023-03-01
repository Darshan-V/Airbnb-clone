import React, { useEffect, useState } from "react"
import { Card, CardBody, Box, CardHeader, Divider } from "@chakra-ui/react"
import { getHotelById } from "../lib/apiClient"
import { useParams } from "react-router"

const PlaceSummary = ({ data }) => {
  const [details, setDetails] = useState([])
  const params = useParams()

  async function getHotelDetails() {
    const hotelData = await getHotelById(params.id)
    setDetails(hotelData)
    return hotelData
  }
  useEffect(() => {
    getHotelDetails()
  }, [params.id])

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex">
            <div className="flex flex-col">
              <span className="text text-lg font-bold ">{details?.name}</span>
              <span className="text-sm text-slate-500 italic underline">
                {details?.address?.location}
              </span>
            </div>
            <div className="flex flex-col ml-auto">
              <span className="text-lg font-bold text-slate-600">Price</span>
              <span className="text-sm italic underline text-slate-500">
                &#8377; {details?.price}
              </span>
            </div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <Box>
            <div className="flex justify-between">
              <span className="text-lg font-bold text-slate-800">Total</span>
              <span className="text-sm text-slate-600 font-bold underline italic">
                &#8377;{data[0]?.total_price}
              </span>
            </div>
          </Box>
        </CardBody>
      </Card>
    </div>
  )
}

export default PlaceSummary
