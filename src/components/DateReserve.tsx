"use client";

import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Select, MenuItem } from "@mui/material";
import { Dayjs } from "dayjs";
import { useState } from "react";

interface DateReserveProps {
  onVenueChange: (value: string) => void;
  onDateChange: (value: Dayjs | null) => void;
}

export default function DateReserve({ onVenueChange, onDateChange }: DateReserveProps) {
  const [coworkingSpace, setCoworkingSpace] = useState<string>("");
  const [apptDate, setApptDate] = useState<Dayjs | null>(null);

  return (
    <div className="bg-white rounded-2xl shadow-md space-y-4 w-full px-8 py-6 flex flex-col justify-center items-center">
      <Select
        variant="outlined"
        fullWidth
        displayEmpty
        value={coworkingSpace}
        onChange={(e) => {
          setCoworkingSpace(e.target.value);
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