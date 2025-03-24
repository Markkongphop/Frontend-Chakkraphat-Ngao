"use client"
import { AppDispatch, useAppSelector } from "@/redux/store"
import { BookingItem } from "../../interface"
import { removeBooking } from "@/redux/features/bookSlice"
import { useDispatch } from "react-redux"
import Link from "next/link"


export default function BookingList(){
    
    const venuesItems = useAppSelector((state)=> state.bookSlice.bookItems)
    const dispatch = useDispatch<AppDispatch>()

    return(
        <>
        {

            venuesItems.length ==0? 'No Venue Booking'
            : venuesItems.map((bookingItem : BookingItem)=> (
                <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" >

                    <div className="text-xl">Name: {bookingItem.nameLastname}</div>
                    <div className="text-xl">Tel: {bookingItem.tel}</div>
                    <div className="text-xl">Venue: {bookingItem.venue}</div>
                    <div className="text-xl">Booking-Date: {bookingItem.bookDate}</div>
                    
                    <button name="Book Venue" className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
                    shadow-sm text-white" onClick={()=>dispatch(removeBooking(bookingItem))}>Remove booking</button>
                    <Link href={`/editbooking?id=${bookingItem.bookingId}`}>
<button name="Edit Booking" className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 my-2 text-white shadow-sm">
    Edit Booking
    </button>
</Link>
                </div>  
            )) 

        }
        </>
    )
}