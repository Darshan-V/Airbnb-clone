import React, { useState } from "react"
import {
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  Icon
} from "@chakra-ui/react"
import { searchListing } from "../lib/apiClient"

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleChange = async (event) => {
    setSearchTerm(event.target.value)
    const listing = await searchListing(searchTerm)
    console.log(listing)
  }

  return (
    <>
      <Input
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
        size="lg"
        rounded="full"
        p="5px"
        mr="5px"
      />
      <Icon name="search" />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalHeader>Search Results</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{/* display search results here */}</ModalBody>
      </Modal>
    </>
  )
}

export default Search
