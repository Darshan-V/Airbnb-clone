const apiUrl = "http://localhost:8000"

async function getHotels() {
  let data = await fetch(`${apiUrl}/hotels`, {
    credentials: "include"
  })
  let [hotels, id] = await data.json()
  return [hotels, id]
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
  const data = await reserve.json()
  console.log(data)

  return data
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

async function searchListing(searchString, min, max, hotelType) {
  let queryUrl = `${apiUrl}/hotels/filters/categories?`
  if (searchString) {
    queryUrl += `search=${searchString}&`
  }
  if (min) {
    queryUrl += `minPrice=${min}&`
  }
  if (max) {
    queryUrl += `maxPrice=${max}&`
  }
  if (hotelType) {
    queryUrl += `type=${hotelType}&`
  }
  // console.log(queryUrl)
  const data = await fetch(queryUrl, { credentials: "include" })
  const searchedList = await data.json()
  // console.log(searchedList)
  return searchedList
}

async function logout() {
  let data = await fetch(`${apiUrl}/logout`, {
    method: "DELETE",
    credentials: "include"
  })
  const logout = await data.json()
  return logout
}

export {
  getHotels,
  getImages,
  reserveSlot,
  getHotelById,
  getUserById,
  getBookingsbyProperty,
  checkSlots,
  searchListing,
  logout
}
