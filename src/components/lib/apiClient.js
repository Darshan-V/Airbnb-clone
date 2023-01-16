const apiUrl = "http://localhost:8000"

async function getHotels() {
  let data = await fetch(`${apiUrl}/hotels`, { credentials: "include" })
  let hotels = await data.json()
  return hotels
}

async function getImages(hotelId) {
  let data = await fetch(`${apiUrl}/hotel/${hotelId}/images`, {
    credentials: "include"
  })
  let images = await data.json()
  return images
}

async function reserveSlot(hotelId, checkinDate, checkoutDate, userId, total) {
  let reserve = await fetch(`${apiUrl}/hotel/${hotelId}/booking`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      checkIn: checkinDate,
      checkOut: checkoutDate,
      userId: userId,
      total: total
    }),
    credentials: "include"
  })
  console.log(reserve)
  return reserve
}

async function getHotelById(hotelId) {
  let data = await fetch(`${apiUrl}/hotel/${hotelId}`, {
    credentials: "include"
  })
  let hotel = await data.json()
  // console.log(hotel)
  return hotel
}

async function getUserById(userId) {
  let data = await fetch(`${apiUrl}/user/${userId}`, { credentials: "include" })
  let user = await data.json()
  // console.log(user)
  return user
}

async function checkSlots(checkIn, checkOut, hotelId) {
  let data = await fetch(
    `${apiUrl}/check/slots/${hotelId}/${checkIn}/${checkOut}`,
    { credentials: "include" }
  )
  let isAvailable = await data.json()
  return isAvailable
}

async function getBookingsbyProperty(hotelId) {
  let data = await fetch(`${apiUrl}/booking/${hotelId}`, {
    credentials: "include"
  })
  const bookingData = await data.json()
  return bookingData
}

async function login() {
  try {
    let data = await fetch(`${apiUrl}/login`)
    const loggedIn = await data.json()
    console.log(loggedIn)
    return loggedIn
  } catch (err) {
    console.log(err)
  }
}

export {
  getHotels,
  getImages,
  reserveSlot,
  getHotelById,
  getUserById,
  getBookingsbyProperty,
  checkSlots,
  login
}
