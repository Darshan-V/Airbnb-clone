const apiUrl = "http://localhost:8000"

async function getHotels() {
  let data = await fetch(`${apiUrl}`)
  let hotels = await data.json()
  return hotels
}

async function getImages(hotelId) {
  let data = await fetch(`${apiUrl}/images/${hotelId}`)
  let images = await data.json()
  return images
}

async function reserveSlot(
  hotelId,
  checkinDate,
  checkoutDate,
  bookingStatus,
  userId
) {
  let reserve = await fetch(`${apiUrl}/booking/${hotelId}`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      checkIn: checkinDate,
      checkOut: checkoutDate,
      bookingStatus: bookingStatus,
      userId: userId
    })
  })
  const postResponse = await reserve.json()
  console.log(postResponse)
}

export { getHotels, getImages, reserveSlot }
