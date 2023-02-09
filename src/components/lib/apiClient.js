const apiUrl = "http://localhost:8000"

async function getHotels() {
  let data = await fetch(`${apiUrl}/hotels`, {
    credentials: "include"
  })
  let hotels = await data.json()
  return hotels
}

async function getImages(hotelId) {
  let data = await fetch(`${apiUrl}/hotels/${hotelId}/images`, {
    credentials: "include"
  })
  let images = await data.json()
  return images
}

async function reserveSlot(hotelId, checkinDate, checkoutDate, total, status) {
  let reserve = await fetch(`${apiUrl}/hotels/${hotelId}/booking`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      checkIn: checkinDate,
      checkOut: checkoutDate,
      total: total,
      status: status
    }),
    credentials: "include"
  })
  console.log(reserve)
  return reserve
}

async function getHotelById(hotelId) {
  let data = await fetch(`${apiUrl}/hotels/${hotelId}`, {
    credentials: "include"
  })
  let hotel = await data.json()
  // console.log(hotel)
  return hotel
}

async function getUserById(userId) {
  let data = await fetch(`${apiUrl}/users/${userId}`, {
    credentials: "include"
  })
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
  let data = await fetch(`${apiUrl}/bookings/${hotelId}`, {
    credentials: "include"
  })
  const bookingData = await data.json()
  return bookingData
}

async function login() {
  let data = await fetch(`${apiUrl}/login`)
  const loggedIn = await data.json()
  return loggedIn
}

async function getHotelsByType(hotelType) {
  let data = await fetch(`${apiUrl}/hotels/types/${hotelType}`, {
    credentials: "include"
  })
  const filteredHotels = await data.json()
  return filteredHotels
}

async function searchHotels(searchString) {
  let data = await fetch(`${apiUrl}/hotels/search/${searchString}`, {
    credentials: "include"
  })
  const hotels = await data.json()
  return hotels
}

async function filterByPrice(min, max) {
  let data = await fetch(`${apiUrl}/filters?minPrice=${min}&maxPrice=${max}`, {
    credentials: "include"
  })
  const hotels = await data.json()
  return hotels
}

export {
  getHotels,
  getImages,
  reserveSlot,
  getHotelById,
  getUserById,
  getBookingsbyProperty,
  checkSlots,
  login,
  getHotelsByType,
  searchHotels,
  filterByPrice
}
