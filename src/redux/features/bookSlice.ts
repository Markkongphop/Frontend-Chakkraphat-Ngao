// src/redux/features/bookSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BookingItem {
  _id: string; // Assuming _id is the bookingId in your database
  apptDate: string; // Or Date, depending on how you store it
  coworkingSpace: string; // Or ObjectId, depending on your database setup
}

type bookState = {
  bookItems: BookingItem[];
};

const initialState: bookState = { bookItems: [] };

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<BookingItem>) => {
      const index = state.bookItems.findIndex(
        (item) =>
          item.coworkingSpace === action.payload.coworkingSpace &&
          item.apptDate === action.payload.apptDate
      );

      if (index !== -1) {
        state.bookItems[index] = action.payload;
      } else {
        state.bookItems.push(action.payload);
      }
    },
    removeBooking: (state, action: PayloadAction<BookingItem>) => {
      const remainItems = state.bookItems.filter(
        (obj) =>
          obj.apptDate !== action.payload.apptDate ||
          obj.coworkingSpace !== action.payload.coworkingSpace ||
          obj._id !== action.payload._id
      );
      state.bookItems = remainItems;
    },
    editBooking: (state, action: PayloadAction<BookingItem>) => {
      const index = state.bookItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index !== -1) {
        state.bookItems[index] = action.payload;
      } else return;
    },
  },
});

export const { addBooking, removeBooking, editBooking } = bookSlice.actions;
export default bookSlice.reducer;