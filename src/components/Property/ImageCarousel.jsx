import React from "react"

const ImageCarousel = ({ images }) => {
  return (
    <div className="flex flex-row w-full h-full overflow-auto no-scrollbar">
      {images.map((image, i) => (
        <img src={image} key={i} className="w-full h-96 m-1 rounded-md" />
      ))}
    </div>
  )
}

export default ImageCarousel
