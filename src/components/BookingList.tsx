"use client"
import { AppDispatch, useAppSelector } from "@/redux/store"
import { BookingItem } from "../../interface"
import { removeBooking } from "@/redux/features/bookSlice"
import { useDispatch } from "react-redux"
import Link from "next/link"


export default function BookingList(){
    
    const venuesItems = useAppSelector((state)=> state.bookSlice.bookItems)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <div className="w-full flex flex-col items-center justify-start pt-10 space-y-4">
          {venuesItems.length == 0 ? (
            <div className="text-gray-700 text-xl font-semibold">No Venue Booking</div>
          ) : (
            venuesItems.map((bookingItem: BookingItem) => (
              <div
                key={bookingItem.bookingId}
                className="bg-white border-2 border-gray-200 rounded-xl shadow-lg px-6 py-4 w-full max-w-md"
              >
                <div className="text-xl font-bold text-gray-800">Name: {bookingItem.nameLastname}</div>
                <div className="text-xl font-semibold text-gray-700">Tel: {bookingItem.tel}</div>
                <div className="text-xl font-semibold text-gray-700">Venue: {bookingItem.venue}</div>
                <div className="text-xl font-semibold text-gray-700">Booking Date: {bookingItem.bookDate}</div>
    
                <div className="flex justify-between mt-4">
                  <button
                    name="Book Venue"
                    className="rounded-md bg-red-500 hover:bg-red-700 px-4 py-2 text-white font-semibold shadow-md transition-all"
                    onClick={() => dispatch(removeBooking(bookingItem))}
                  >
                    Remove Booking
                  </button>
                  <Link href={`/editbooking?id=${bookingItem.bookingId}`}>
                    <button
                      name="Edit Booking"
                      className="rounded-md bg-green-500 hover:bg-green-700 px-4 py-2 text-white font-semibold shadow-md transition-all"
                    >
                      Edit Booking
                    </button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      );
}