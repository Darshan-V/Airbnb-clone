import React, { useEffect, useState } from "react"
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Avatar,
  useDisclosure,
  Box
} from "@chakra-ui/react"
import { BiUser } from "react-icons/bi"
import { getUserById } from "../lib/apiClient"
import { useNavigate } from "react-router"
import { logout } from "../lib/apiClient"
import Loading from "../pages/Loading"

const UserDrawer = ({ userId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [details, setDetails] = useState([])
  const navigate = useNavigate()

  const getUserDetails = async () => {
    if (!userId) {
      return <Loading />
    }
    const details = await getUserById(userId)
    setDetails(details)
  }
  const logoutUser = async () => {
    logout()
    navigate("/")
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

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        closeOnEsc="true"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottom="1px" bg="orange.100">
            <Avatar
              size="sm"
              mr="1.5"
              bg="blue.300"
              name={details?.name}
            ></Avatar>
            {details?.name?.toUpperCase()}
          </DrawerHeader>

          <DrawerBody
            className="flex flex-col m-1"
            bgGradient="linear(to-r, orange.200, orange.50)"
          >
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
            <span className="text-2xl text-white m-auto" onClick={logoutUser}>
              Logout
            </span>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default UserDrawer
