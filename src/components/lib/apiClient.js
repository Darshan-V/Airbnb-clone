const apiUrl = "http://localhost:8000"

async function getHotels() {
  let data = await fetch(`${apiUrl}/hotels`)
  let hotels = await data.json()
  return hotels
}

async function getImages(hotelId) {
  try {
    let data = await fetch(`${apiUrl}/hotel/${hotelId}/images`)
    let images = await data.json()
    return images
  } catch (err) {
    console.log(err.stack)
  }
}

async function reserveSlot(hotelId, checkinDate, checkoutDate, userId, nights) {
  let reserve = await fetch(`${apiUrl}/hotel/${hotelId}/booking`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      checkIn: checkinDate,
      checkOut: checkoutDate,
      userId: userId,
      nights: nights
    })
  })
  console.log(reserve)
  return reserve
}

async function getHotelById(hotelId) {
  let data = await fetch(`${apiUrl}/hotel/${hotelId}`)
  let hotel = await data.json()
  // console.log(hotel)
  return hotel
}

async function getUserById(userId) {
  let data = await fetch(`${apiUrl}/user/${userId}`)
  let user = await data.json()
  // console.log(user)
  return user
}

async function checkSlots(checkIn, checkOut, hotelId) {
  let data = await fetch(
    `${apiUrl}/check/slots/${hotelId}/${checkIn}/${checkOut}`
  )
  let isAvailable = await data.json()
  return isAvailable
}

async function getBookingsbyProperty(hotelId) {
  try {
    let data = await fetch(`${apiUrl}/booking/${hotelId}`)
    const bookingData = await data.json()
    return bookingData
  } catch (error) {
    return error.stack
  }
}

export {
  getHotels,
  getImages,
  reserveSlot,
  getHotelById,
  getUserById,
  getBookingsbyProperty,
  checkSlots
}
