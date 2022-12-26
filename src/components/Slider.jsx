import React from "react"
import { Carousel } from "react-carousel-minimal"
import store from "./../../../airbnb-data/store.js"
const images = [
  { image: store.homeMainPic },
  { image: store.carouselPic1 },
  { image: store.carouselPic2 },
  { image: store.carouselPic3 },
  { image: store.carouselPic4 },
  { image: store.carouselPic5 }
]

const Slider = () => {
  return (
    <div className="reactSlider--homePlace">
      <Carousel
        data={images}
        width="15rem"
        height="15rem"
        radius="10px"
        automatic={false}
        dots={true}
        pauseIconColor="white"
        pauseIconSize="40px"
        slideBackgroundColor="darkgrey"
        slideImageFit="cover"
      />
    </div>
  )
}

export default Slider
