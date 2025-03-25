"use client";

import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Select, MenuItem } from "@mui/material";
import { Dayjs } from "dayjs";
import { useState, useEffect } from "react";

interface DateReserveProps {
  onVenueChange: (value: string) => void;
  onDateChange: (value: Dayjs | null) => void;
}

interface CoworkingSpace {
  _id: string;
  name: string;
  // ...other properties if needed
}

export default function DateReserve({ onVenueChange, onDateChange }: DateReserveProps) {
  const [selectedCoworkingSpaceId, setSelectedCoworkingSpaceId] = useState<string>("");
  const [apptDate, setApptDate] = useState<Dayjs | null>(null);
  const [coworkingSpaces, setCoworkingSpaces] = useState<CoworkingSpace[]>([]);

  useEffect(() => {
    const fetchCoworkingSpaces = async () => {
      try {
        const response = await fetch('https://backend-eta-ashy.vercel.app/api/v1/coworkingspaces');
        if (response.ok) {
          const data = await response.json();
          setCoworkingSpaces(data.data);
        } else {
          console.error('Failed to fetch coworking spaces');
        }
      } catch (error) {
        console.error('Error fetching coworking spaces:', error);
      }
    };

    fetchCoworkingSpaces();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-md space-y-4 w-full px-8 py-6 flex flex-col justify-center items-center">
      {coworkingSpaces.length > 0 && ( // Conditionally render Select
        <Select
          variant="outlined"
          fullWidth
          displayEmpty
          value={selectedCoworkingSpaceId}
          onChange={(e) => {
            setSelectedCoworkingSpaceId(e.target.value);
            onVenueChange(e.target.value);
          }}
          className="shadow-sm"
        >
          <MenuItem value="" disabled>
            Select a Place
          </MenuItem>
          {coworkingSpaces.map((space) => (
            <MenuItem key={space._id} value={space._id}>
              {space.name}
            </MenuItem>
          ))}
        </Select>
      )}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className="bg-white shadow-sm w-full"
          value={apptDate}
          onChange={(value) => {
            setApptDate(value);
            onDateChange(value);
          }}
          slotProps={{ textField: { fullWidth: true, variant: "outlined" } }}
        />
      </LocalizationProvider>
    </div>
  );
}