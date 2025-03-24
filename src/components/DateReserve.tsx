"use client"

import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Select,MenuItem, TextField } from "@mui/material"
import { Dayjs } from "dayjs"
import { ChangeEventHandler, useState } from "react"

export default function DateReserve({ handleNameChange,handleContactChange, onVenueChange, onDateChange }:{ handleNameChange:Function, handleContactChange:Function, onVenueChange:Function, onDateChange:Function}){

    const [nameLastname, setNameLastname] = useState<string>('')
    const [contactNumber, setContactNumber] = useState<string>('')
    const [venueName, setVenueName] = useState<string>('')
    const [bookingDate, setBookingDate] = useState<Dayjs|null>(null)

    return(
        <div className="bg-slate-100 rounded-lg space-x-5 space-y-2
        w-fit px-10 py-5 flex flex-row justify-canter">
            
            <TextField id="outlined-basic" label="Name-Lastname" 
                name="Name-Lastname" placeholder="Name-Lastname" 
                variant="standard" value={nameLastname} onChange={(e)=>{ setNameLastname(e.target.value),handleNameChange(e.target.value)}} />

            <TextField id="outlined-basic" label="Contact-Number" 
                name="Contact-Number" placeholder="Contact-Number" 
                variant="standard" value={contactNumber} onChange={(e)=>{ setContactNumber(e.target.value),handleContactChange(e.target.value)}} />

            <Select variant='standard' name="venue" id="venue" className="h-[2em] w-[200px]" 
                value={venueName} onChange={(e)=>{ setVenueName(e.target.value); onVenueChange(e.target.value);}}>
            <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
            <MenuItem value="Spark">Spark Space</MenuItem>
            <MenuItem value="GrandTable">The Grand Table</MenuItem>
            </Select>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white "
                value={bookingDate}
                onChange={(value)=>{setBookingDate(value); onDateChange(value)}}/>
            </LocalizationProvider>

            

        </div>
    )
}