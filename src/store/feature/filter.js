import { createSlice } from "@reduxjs/toolkit"

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    searchString: "",
    category: "",
    minPrice: 0,
    maxPrice: 999999
  },
  reducers: {
    searchQueryString: (state, action) => {
      state.searchString = action.payload.searchKey
    }
  }
})
