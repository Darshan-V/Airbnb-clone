import { configureStore } from "@reduxjs/toolkit"
import { filterSlice } from "./feature/filter"

export const store = configureStore({
  reducer: {
    searchQuery: filterSlice
  }
})
console.log(filterSlice.reducer.state)
