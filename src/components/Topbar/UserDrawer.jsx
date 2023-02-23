import React, { useEffect, useState } from "react"
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Avatar,
  useDisclosure,
  Box
} from "@chakra-ui/react"
import { BiUser } from "react-icons/bi"
import { getUserById } from "../lib/apiClient"
import { useNavigate } from "react-router"

const UserDrawer = ({ userId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [details, setDetails] = useState([])
  const navigate = useNavigate()

  const getUserDetails = async () => {
    const details = await getUserById(userId)
    setDetails(details)
  }
  useEffect(() => {
    getUserDetails()
  }, [userId])

  return (
    <div className="hover:cursor-pointer ">
      <Avatar
        bg="orange.300"
        icon={<BiUser fontSize="1.5rem" />}
        size="md"
        onClick={onOpen}
      />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottom="1px">
            <Avatar
              size="sm"
              mr="1.5"
              bg="orange.300"
              name={details?.name}
            ></Avatar>
            {details?.name?.toUpperCase()}
          </DrawerHeader>

          <DrawerBody className="flex flex-col m-1">
            <Box m="1" className="hover:cursor-pointer">
              <p className="font font-thin font-mono">Airbnb your Home</p>
            </Box>
            <Box m="1" className="hover:cursor-pointer">
              <p className="font font-thin font-mono">Host an experience</p>
            </Box>
          </DrawerBody>

          <DrawerFooter
            bg="red.500"
            className="hover:cursor-pointer"
            onClick={() => {
              navigate(`/`)
              onClose()
            }}
          >
            <span className="text-2xl text-white m-auto">Logout</span>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default UserDrawer
