// src/app/editBooking/page.tsx

"use client";

import DateReserve from "@/components/DateReserve";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";

export default function EditBooking() {
  const [apptDate, setApptDate] = useState<Dayjs | null>(null);
  const [coworkingSpace, setCoworkingSpace] = useState<string>("");
  const urlParam = useSearchParams();
  const id = urlParam.get("id");
  const router = useRouter();

  useEffect(() => {
    if (!id) {
      router.push("/");
    }
  }, [id, router]);

  const makeBooking = async () => {
    if (apptDate && coworkingSpace && id) {
      try {
        const response = await fetch(`/api/bookings/${id}`, {
          method: 'PUT',
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
          alert('Failed to edit reservation.');
        }
      } catch (error) {
        console.error('Error editing reservation:', error);
        alert('An error occurred.');
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <main className="w-[100%] flex flex-col items-center space-y-4">
      <div>Edit Your Reservation</div>

      <DateReserve
        onDateChange={(value: Dayjs | null) => setApptDate(value)}
        onVenueChange={(value: string) => setCoworkingSpace(value)}
      />

      <button
        name="Book Venue"
        className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white"
        onClick={() => {
          makeBooking();
        }}
      >
        Confirm
      </button>
    </main>
  );
}