import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    searchString: "",
    type: "",
    minPrice: 0,
    maxPrice: 999999
  },
  reducers: {
    searchQueryString: (state, action) => {
      state.searchString = action.payload
      console.log(state.searchString)
    },
    setType: (state, action) => {
      state.type = action.payload
      console.log(state.type)
    }
  }
})
export const { searchQueryString, setType } = filterSlice.actions

export default filterSlice.reducer
