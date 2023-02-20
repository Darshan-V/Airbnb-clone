import React, { useState } from "react"
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  Input,
  Button,
  ModalFooter,
  ModalCloseButton,
  ModalContent,
  useDisclosure,
  Fade
} from "@chakra-ui/react"
import Slider from "./RangeSlider"
import { searchListing } from "../lib/apiClient"

const FilterListing = ({ change, setFilteredHotels }) => {
  const [min, setMin] = useState(100)
  const [max, setMax] = useState(9999999)
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure()
  const [counter, setCounter] = useState(0)

  const filterHotelsbyPrice = async (minPrice, maxPrice) => {
    let searchString = ""
    let hotelType = ""
    let hotels = await searchListing(
      searchString,
      minPrice,
      maxPrice,
      hotelType
    )
    change(hotels)
    setFilteredHotels(hotels)
  }

  return (
    <div className="m-auto">
      <Button
        className="text text-3xl font text-yellow-600 hover:text-black bg-slate-300 w-20 h-8 ml-auto rounded-lg shadow-lg shadow-slate-400 m-auto"
        onClick={(onOpen, onToggle)}
      >
        Filter
      </Button>
      <Fade in={isOpen}>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader>
              <div className="flex flex-row justify-between">
                <div>
                  <span className="text-sm font-semibold font-sans italic">
                    Min Price
                  </span>
                  <Input
                    type="number"
                    placeholder="Min price..."
                    value={min}
                    onChange={(e) => setMin(e.target.value)}
                    rounded="md"
                  />
                </div>
                <div>
                  <span className="text-sm font-semibold font-sans italic">
                    Max Price
                  </span>
                  <Input
                    type="number"
                    placeholder="Max price..."
                    value={max}
                    onChange={(e) => setMax(e.target.value)}
                    rounded="md"
                  />
                </div>
              </div>
              <div>
                <Slider min={min} max={max} setMin={setMin} setMax={setMax} />
              </div>
              <div className="w-full h-full m-2">
                <span className="text-sm font-semibold font-sans italic">
                  Total Occupancy
                </span>
                <div className="flex flex-row m-2 justify-around w-40">
                  <Button
                    onClick={() => {
                      if (counter > 0) {
                        setCounter(counter - 1)
                      }
                    }}
                  >
                    &#8722;
                  </Button>
                  <Input
                    value={counter}
                    maxW="3rem"
                    onChange={(e) => setCounter(e.target.value)}
                  />
                  <Button
                    onClick={() => {
                      setCounter(counter + 1)
                    }}
                  >
                    &#43;
                  </Button>
                </div>
              </div>
            </ModalHeader>
            <ModalFooter>
              <Button
                colorScheme="blue"
                onClick={() => {
                  filterHotelsbyPrice(min, max)
                  onClose()
                }}
              >
                Apply
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Fade>
    </div>
  )
}

export default FilterListing
