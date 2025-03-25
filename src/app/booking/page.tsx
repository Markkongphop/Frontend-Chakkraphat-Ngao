// src/app/makeBooking/page.tsx

"use client";

import DateReserve from "@/components/DateReserve";
import { useRouter } from "next/navigation";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

export default function Booking() {
  const [apptDate, setApptDate] = useState<Dayjs | null>(null);
  const [coworkingSpace, setCoworkingSpace] = useState<string>("");
  const router = useRouter();

  const makeBooking = async () => {
    if (apptDate && coworkingSpace) {
      try {
        const response = await fetch('/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            apptDate: dayjs(apptDate).format("YYYY/MM/DD"),
            coworkingSpace: coworkingSpace,
          }),
        });

        if (response.ok) {
          router.push('/');
        } else {
          alert('Failed to create reservation.');
        }
      } catch (error) {
        console.error('Error creating reservation:', error);
        alert('An error occurred.');
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-green-150 p-6">
      <div className="text-4xl font-bold text-gray-800 mb-6 drop-shadow-md">Co-Working Reservation</div>
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center space-y-6">
        <DateReserve
          onDateChange={(value: Dayjs | null) => setApptDate(value)}
          onVenueChange={(value: string) => setCoworkingSpace(value)}
        />
        <button
          className="w-full rounded-xl bg-gradient-to-r from-green-400 to-green-600 hover:from-green-600 hover:to-green-400 px-4 py-2 text-white font-semibold shadow-lg transition-all transform hover:scale-105 duration-300 ease-in-out"
          onClick={makeBooking}
        >
          Reserve
        </button>
      </div>
    </main>
  );
}