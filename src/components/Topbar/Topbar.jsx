import React, { useState } from "react"
import { TbAerialLift, TbSearch } from "react-icons/tb"
import { useNavigate, useParams } from "react-router"
import { Link } from "react-router-dom"
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react"
import "./chakra.css"
import { getHotels, searchListing } from "../lib/apiClient"
import Logo from "./flc_design20230220117636.png"

const Topbar = ({ data, change }) => {
  const params = useParams()
  const navigate = useNavigate()

  const getAllListing = async () => {
    const listing = await getHotels()
    change(listing)
  }

  const Search = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchedList, setSearchedList] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()

    const searchForProperty = async (event) => {
      setSearchTerm(event.target.value)
      const listing = await searchListing(searchTerm)
      setSearchedList(listing)
      console.log(listing)
    }

    return (
      <>
        <TbSearch
          className="text text-3xl font text-yellow-600 hover:text-yellow-400 bg-slate-300 w-20 h-8 ml-auto rounded-lg shadow-lg shadow-slate-400"
          onClick={onOpen}
        />

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
        <div className="flex justify-between w-full m-auto pb-5 bg-white">
          <Link
            to={"/home"}
            className="flex justify-center mr-auto rounded-lg "
            onClick={getAllListing}
          >
            <img src={Logo} className="w-28" />
          </Link>
          {params?.id === undefined ? (
            <div className="flex flex-col align-middle ">
              <div className="flex flex-row">
                <Search />
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
        <div className="flex justify-between w-full m-auto bg-white-300 h-16 sticky top-0 bg-white">
          <Link
            to={"/home"}
            className="flex justify-center mr-auto rounded-lg "
            onClick={getAllListing}
          >
            <img src={Logo} className="w-28" />
          </Link>
          {params?.id === undefined ? (
            <div className="flex flex-col align-middle w-40">
              <div className="flex flex-row m-auto">
                <Search />
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
