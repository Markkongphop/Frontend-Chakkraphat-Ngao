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
        <div className="bg-white rounded-2xl shadow-md space-y-4 w-full px-8 py-6 flex flex-col justify-center items-center">
            <TextField
                id="name"
                label="Name - Lastname"
                placeholder="Enter your name"
                variant="outlined"
                fullWidth
                value={nameLastname}
                onChange={(e) => {
                    setNameLastname(e.target.value);
                    handleNameChange(e.target.value);
                }}
                className="shadow-sm"
            />

            <TextField
                id="contact"
                label="Contact Number"
                placeholder="Enter your phone number"
                variant="outlined"
                fullWidth
                value={contactNumber}
                onChange={(e) => {
                    setContactNumber(e.target.value);
                    handleContactChange(e.target.value);
                }}
                className="shadow-sm"
            />

            <Select
                variant="outlined"
                fullWidth
                displayEmpty
                value={venueName}
                onChange={(e) => {
                    setVenueName(e.target.value);
                    onVenueChange(e.target.value);
                }}
                className="shadow-sm"
            >
            <MenuItem value="" disabled>
                Select a Place
            </MenuItem>
            <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
            <MenuItem value="Spark">Spark Space</MenuItem>
            <MenuItem value="GrandTable">The Grand Table</MenuItem>
        </Select>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className="bg-white shadow-sm w-full"
          value={bookingDate}
          onChange={(value) => {
            setBookingDate(value);
            onDateChange(value);
          }}
          slotProps={{ textField: { fullWidth: true, variant: "outlined" } }}
        />
      </LocalizationProvider>
    </div>
    )
}