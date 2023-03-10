import React, { useEffect, useState } from "react"
import { TbSearch } from "react-icons/tb"
import { useNavigate, useParams } from "react-router"
import { Link } from "react-router-dom"
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Button,
  useDisclosure
} from "@chakra-ui/react"
import "./chakra.css"
import { getHotels, searchListing } from "../lib/apiClient"
import Logo from "./flc_design20230220117636-88725c9c.png"
import UserDrawer from "./UserDrawer"

const Topbar = ({ setPropertyData }) => {
  const params = useParams()
  const navigate = useNavigate()
  const [userId, setUserId] = useState("")

  const getAllListing = async () => {
    const [listing, id] = await getHotels()
    setUserId(id)
  }

  useEffect(() => {
    getAllListing()
  }, [])

  const Search = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchedList, setSearchedList] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()

    const searchForProperty = async (event) => {
      const string = event.target.value
      setSearchTerm(string)
      const listing = await searchListing(string)
      setSearchedList(listing)
    }

    return (
      <>
        <Button
          variant="outline"
          colorScheme="pink"
          onClick={onOpen}
          height="full"
          rounded="3xl"
        >
          <TbSearch className="text text-4xl text-pink-600" />
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={searchForProperty}
                size="md"
                rounded="md"
                mr="5px"
              />
            </ModalHeader>
            <ModalBody>
              {searchedList?.slice(0, 15)?.map((string, i) => (
                <div key={i} className="flex flex-col w-full">
                  <div
                    className="hover:cursor-pointer w-full h-5 m-1 bg-slate-300 rounded-md pl-3"
                    onClick={() => {
                      navigate(`/property/${string.id}`)
                    }}
                  >
                    {string.name}
                  </div>
                </div>
              ))}
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }

  return (
    <>
      {params?.id ? (
        <div className="flex justify-between w-full pb-5 bg-white mt-2">
          <Link
            to={"/home"}
            className="flex justify-center mr-auto rounded-lg bg-pink-600"
            onClick={getAllListing}
          >
            <img src={Logo} className="w-28" />
          </Link>
          {params?.id === undefined ? (
            <div className="flex flex-col align-middle ">
              <div className="flex flex-row">
                <Search />
                <UserDrawer userId={userId} />
              </div>
            </div>
          ) : null}

          {params?.id ? (
            <div className="flex flex-row justify-evenly m-auto">
              <div className="w-20">
                <span>Photos</span>
              </div>
              <div className="w-20">
                <span>Reviews</span>
              </div>
              <div className="w-20">
                <span>Location</span>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="flex justify-between w-full h-16 sticky top-0 bg-white pt-2 pb-2 border-b-2">
          <Link
            to={"/home"}
            className="flex justify-center mr-auto rounded-lg bg-pink-700 ml-1 "
            onClick={getAllListing}
          >
            <img src={Logo} className="w-28" />
          </Link>
          {params?.id === undefined ? (
            <div className="flex flex-col align-middle justify-center w-60">
              <div className="flex flex-row justify-evenly ">
                <Search />
                <UserDrawer userId={userId} />
              </div>
            </div>
          ) : null}

          {params?.id ? (
            <div className="flex flex-row justify-evenly">
              <div className="w-20 m-auto">
                <span>Photos</span>
              </div>
              <div className="w-20 m-auto">
                <span>Reviews</span>
              </div>
              <div className="w-20 m-auto">
                <span>Location</span>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </>
  )
}

export default Topbar
