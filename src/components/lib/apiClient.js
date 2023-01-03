const apiUrl = "http://localhost:8000"

async function getHotels() {
  let data = await fetch(`${apiUrl}/hotels`)
  let hotels = await data.json()
  return hotels
}

async function getImages(hotelId) {
  try {
    let data = await fetch(`${apiUrl}/hotel/images/${hotelId}`)
    let images = await data.json()
    return images
  } catch (err) {
    console.log(err.stack)
  }
}

async function reserveSlot(
  hotelId,
  checkinDate,
  checkoutDate,
  bookingStatus,
  userId,
  nights
) {
  let reserve = await fetch(`${apiUrl}/hotel/booking/${hotelId}`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      checkIn: checkinDate,
      checkOut: checkoutDate,
      bookingStatus: bookingStatus,
      userId: userId,
      nights: nights
    })
  })
  const postResponse = await reserve.json()
  console.log(postResponse)
}

async function getHotelById(hotelId) {
  let data = await fetch(`${apiUrl}/hotel/${hotelId}`)
  let hotel = await data.json()
  console.log(hotel)
  return hotel
}

export { getHotels, getImages, reserveSlot, getHotelById }
