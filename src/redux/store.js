import { configureStore } from "@reduxjs/toolkit"
import { bookingsApi } from "./utils"
import reservationReducer from "./reservationSlice"

export const store = configureStore({
  reducer: {
    [bookingsApi.reducerPath]: bookingsApi.reducer,
    reservation: reservationReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookingsApi.middleware)
})
