import React from "react"
import { CircularProgress } from "@chakra-ui/react"

const ConfirmationLoading = () => {
  return (
    <div className="flex flex-col h-screen w-screen m-auto">
      <CircularProgress
        isIndeterminate
        color="green.300"
        size="100px"
        thickness="15px"
        m="auto"
      />
      <div className="m-auto">
        <span>Your booking is being confirmed please wait!</span>
      </div>
    </div>
  )
}

export default ConfirmationLoading
