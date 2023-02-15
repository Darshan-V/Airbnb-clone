import React from "react"
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Box
} from "@chakra-ui/react"
import { MdGraphicEq } from "react-icons/md"

const Slider = ({ min, max, setMin, setMax }) => {
  return (
    <div className="mt-10">
      <RangeSlider
        aria-label={["min", "max"]}
        defaultValue={[min, max]}
        min={0}
        max={99999}
        onChange={(val) => {
          setMin(val[0])
          setMax(val[1])
        }}
      >
        <RangeSliderTrack bg="orange.100">
          <RangeSliderFilledTrack bg="tomato" />
        </RangeSliderTrack>
        <RangeSliderThumb boxSize={6} index={0}>
          <Box color="tomato" as={MdGraphicEq} />
        </RangeSliderThumb>
        <RangeSliderThumb boxSize={6} index={1}>
          <Box color="tomato" as={MdGraphicEq} />
        </RangeSliderThumb>
      </RangeSlider>
    </div>
  )
}

export default Slider
