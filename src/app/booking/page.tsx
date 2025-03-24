"use client"

import DateReserve from "@/components/DateReserve"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { addBooking } from "@/redux/features/bookSlice"
import { BookingItem } from "../../../interface"
import { default as TextField } from "@mui/material"

export default function Booking(){
    
    
        // const session = await getServerSession(authOptions)
        // if(!session || !session.user.token )return null
    
        // const profile = await getUserProfile(session.user.token)
        // var createdAt = new Date(profile.data.createdAt)

        const generateBookingId = (): string => {
            const randomNumber = Math.floor(100000 + Math.random() * 900000); // สุ่มตัวเลข 6 หลัก
            return randomNumber.toString(); // แปลงตัวเลขเป็นสตริง
        };

        const [nameLastname, setNameLastname] = useState<string>('')
        const [contactNumber, setContactNumber] = useState<string>('')
        const [venueName, setVenueName] = useState<string>('')
        const [bookingDate, setBookingDate] = useState<Dayjs|null>(null)

        const dispatch = useDispatch<AppDispatch>() 

        const makeBooking = () => {
            
            if ( nameLastname && contactNumber && venueName && bookingDate){
                alert("complete");
                const item:BookingItem = {
                    bookingId: generateBookingId(),
                    nameLastname: nameLastname,
                    tel: contactNumber,
                    venue: venueName,
                    bookDate: dayjs(bookingDate).format("YYYY/MM/DD")
                }
                dispatch(addBooking(item))
            }
        }

    return(
        <main className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-green-150 p-6">
            <div className="text-4xl font-bold text-gray-800 mb-6 drop-shadow-md">Co-Working Reservation</div>
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center space-y-6">
            <DateReserve
                handleNameChange={(value: string) => setNameLastname(value)}
                handleContactChange={(value: string) => setContactNumber(value)}
                onDateChange={(value: Dayjs) => setBookingDate(value)}
                onVenueChange={(value: string) => setVenueName(value)}
            />
            <button
                className="w-full rounded-xl bg-gradient-to-r from-green-400 to-green-600 hover:from-green-600 hover:to-green-400 px-4 py-2 text-white font-semibold shadow-lg transition-all transform hover:scale-105 duration-300 ease-in-out"
                onClick={makeBooking}
            >
            Reserve
            </button>
            </div>
    </main>
    )
}