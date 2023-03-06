import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    searchString: "",
    type: "",
    minPrice: 0,
    maxPrice: 999999,
    bookingId: 0,
    booking: []
  },
  reducers: {
    searchQueryString: (state, action) => {
      state.searchString = action.payload
    },
    setType: (state, action) => {
      state.type = action.payload
    },
    setBookingId: (state, action) => {
      state.bookingId = action.payload
      console.log(action.payload)
    },
    setBooking: (state, action) => {
      state.booking = action.payload
    }
  }
})

export const { searchQueryString, setType, setBooking, setBookingId } =
  filterSlice.actions

export default filterSlice.reducer
