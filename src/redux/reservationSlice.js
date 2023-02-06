import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  reservation: {}
}

const reservationSlice = createSlice({
  name: "preBooking",
  initialState,
  reducers: {
    setReservation: (state, action) => {
      state.reservation = action.payload
    }
  }
})

export const { setReservation } = reservationSlice.actions
export default reservationSlice.reducer
