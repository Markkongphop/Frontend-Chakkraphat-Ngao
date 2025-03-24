import { createSlice ,PayloadAction } from "@reduxjs/toolkit";
import { BookingItem } from "../../../interface";

type bookState = {
    bookItems:BookingItem[]
}
const initialState:bookState = { bookItems:[]}

export const bookSlice = createSlice({
    name:"book",
    initialState,
    reducers:{
      addBooking: (state, action: PayloadAction<BookingItem>) => {
        const index = state.bookItems.findIndex(
          (item) =>
            item.venue === action.payload.venue &&
            item.bookDate === action.payload.bookDate
        );
      
        if (index !== -1) {
          state.bookItems[index] = action.payload;
        } else {
          state.bookItems.push(action.payload);
        }
      },
        removeBooking:(state,action:PayloadAction<BookingItem>)=>{
            const remainItems = state.bookItems.filter(obj => {
                return ((obj.nameLastname !== action.payload.nameLastname)
            ||(obj.bookDate !== action.payload.bookDate) 
            ||(obj.tel !== action.payload.tel) || (obj.venue !== action.payload.venue));
            })
            state.bookItems = remainItems
        }
    }
})
export const {addBooking , removeBooking} = bookSlice.actions
export default bookSlice.reducer