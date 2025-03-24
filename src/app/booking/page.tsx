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

        const [nameLastname, setNameLastname] = useState<string>('')
        const [contactNumber, setContactNumber] = useState<string>('')
        const [venueName, setVenueName] = useState<string>('')
        const [bookingDate, setBookingDate] = useState<Dayjs|null>(null)

        const dispatch = useDispatch<AppDispatch>() 

        const makeBooking = () => {
            
            if ( nameLastname && contactNumber && venueName && bookingDate){
                alert("complete");
                const item:BookingItem = {
                    nameLastname: nameLastname,
                    tel: contactNumber,
                    venue: venueName,
                    bookDate: dayjs(bookingDate).format("YYYY/MM/DD")
                }
                dispatch(addBooking(item))
            }
        }

    return(
        <main className="w-[100%] 
        flex flex-col items-center space-y-4">
            <div>Venue Booking</div>

            {/* <div className="text-2xl">{profile.data.name}</div> */}
            {/* <table><tbody>

            <tr><td>Name</td><td>{profile.data.name}</td></tr>
            <tr><td>Email</td><td>{profile.data.email}</td></tr>
            <tr><td>Tel.</td><td>{profile.data.tel}</td></tr>
            <tr><td>Member Since</td><td>{createdAt.toString()}</td></tr>
            
            </tbody>

            </table> */}
            <DateReserve 
            handleNameChange={(value:string)=>{setNameLastname(value)}}
            handleContactChange={(value:string)=>{setContactNumber(value)}}
            onDateChange={(value:Dayjs)=>{setBookingDate(value)}}
            onVenueChange={(value:string)=>{setVenueName(value)}}
            />  

            <button name="Book Venue" className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
            shadow-sm text-white" onClick={()=>{makeBooking()}}>Book Venue</button>



        </main>
    )
}