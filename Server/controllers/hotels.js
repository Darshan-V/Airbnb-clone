import {
  getHotels,
  getImages,
  getHotelById,
  // getHotelByType,
  // searchHotel,
  // filterHotels,
  searchListing
} from "../models/hotelModel.js"

async function getAllHotels(req, res) {
  try {
    const hotels = await getHotels()
    const userId = req.userId
    res.json([hotels, userId])
  } catch (err) {
    res.sendStatus(500)
  }
}

async function getHotelImages(req, res) {
  try {
    const hotelId = req.params.id
    if (!hotelId) {
      res.status(404).json("property with id not found")
    } else {
      const images = await getImages(hotelId)
      res.json(images[0].imageurl)
    }
  } catch (err) {
    res.sendStatus(500)
  }
}

async function getHotelByHotelId(req, res) {
  try {
    const hotelId = req.params.id
    if (!hotelId || hotelId === "undefined") {
      res.status(400).json("required hotel field")
      return
    }
    const hotel = await getHotelById(hotelId)
    if (hotel.length === 0) {
      res.status(404).json("Requested property not exist")
    }
    res.json(hotel[0])
  } catch (err) {
    res.sendStatus(500)
  }
}

// async function getHotelsByHotelType(req, res) {
//   try {
//     const hotelType = req.params.hotelType
//     const hotels = await getHotelByType(hotelType)
//     res.json(hotels)
//   } catch (err) {
//     res.sendStatus(500)
//   }
// }

// async function searchHotels(req, res) {
//   try {
//     const searchString = req.params.searchString
//     const hotels = await searchHotel(searchString)
//     res.json(hotels)
//   } catch (error) {
//     res.sendStatus(500)
//   }
// }

// async function controlFilterHotels(req, res) {
//   try {
//     const maxPrice = req.query.maxPrice
//     const minPrice = req.query.minPrice
//     console.log(req.query)
//     const hotels = await filterHotels(minPrice, maxPrice)
//     res.json(hotels)
//   } catch (error) {
//     res.sendStatus(500)
//   }
// }
async function testController(req, res) {
  try {
    const querystring = req.query
    const sortedListing = await searchListing(querystring)
    res.json(sortedListing)
  } catch (error) {
    res.sendStatus(500)
  }
}

export {
  getAllHotels,
  getHotelImages,
  getHotelByHotelId,
  // getHotelsByHotelType,
  // searchHotels,
  // controlFilterHotels,
  testController
}
