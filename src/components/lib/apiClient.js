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

async function reserveSlot(hotelId, checkinDate, checkoutDate, userId, total) {
  let reserve = await fetch(`${apiUrl}/hotel/booking/${hotelId}`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      checkIn: checkinDate,
      checkOut: checkoutDate,
      userId: userId,
      total: total
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

async function validateCheckIn(checkIn, propertyId) {
  let data = await fetch(`${apiUrl}/validate/${checkIn}/${propertyId}`)
  return data
}

export {
  getHotels,
  getImages,
  reserveSlot,
  getHotelById,
  getUserById,
  validateCheckIn
}
