import React from "react"
import { Spinner, Center } from "@chakra-ui/react"

const Loading = () => {
  return (
    <Center h="100vh">
      <Spinner size="xl" color="orange.500" thickness="6px" />
    </Center>
  )
}

export default Loading
