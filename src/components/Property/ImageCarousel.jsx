import React from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "./carousel.css"

const ImageCarousel = ({ images }) => {
  return (
    <div className="w-3/4 h-full mr-auto rounded-lg">
      <Carousel
        showArrows={true}
        autoPlay={false}
        width="100%"
        dynamicHeight={false}
        className="m-auto "
      >
        {images.map((image, i) => (
          <div key={i}>
            <img src={image} className="rounded-lg " />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default ImageCarousel
