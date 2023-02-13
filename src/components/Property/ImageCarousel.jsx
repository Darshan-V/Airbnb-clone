import React from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "./carousel.css"

const ImageCarousel = ({ images }) => {
  return (
    <div className=" flex flex-row w-full h-full mr-auto rounded-lg">
      <Carousel
        showArrows={true}
        autoPlay={false}
        dynamicHeight={false}
        infiniteLoop={true}
        showStatus={true}
        className="m-auto "
      >
        {images.map((image, i) => (
          <div key={i}>
            <img src={image} className="rounded-lg w-full h-full" />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default ImageCarousel
