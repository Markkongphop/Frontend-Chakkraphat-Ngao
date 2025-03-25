"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";

interface CoworkingSpace {
    _id: string;
    name: string;
    address: string;
    tel: string;
    id: string;
}

interface BookingItem {
    _id: string;
    apptDate: string;
    user: string;
    coworkingSpace: CoworkingSpace;
    createdAt: string;
    __v: number;
}

interface ResponseData {
    data: BookingItem[];
}

export default function BookingList() {
    const [bookings, setBookings] = useState<BookingItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { data: session } = useSession();

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                if (!session?.user?.accessToken) {
                    setError("Unauthorized. Please log in.");
                    setLoading(false);
                    return;
                }

                const response = await fetch('https://backend-eta-ashy.vercel.app/api/v1/reservations', {
                    headers: {
                        Authorization: `Bearer ${session.user.accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: ResponseData = await response.json();
                setBookings(data.data);
                setLoading(false);
            } catch (err) {
                setError((err as Error).message);
                setLoading(false);
            }
        };

        fetchBookings();
    }, [session]);

    const handleDelete = async (id: string) => {
        if (!session?.user?.accessToken) {
            alert("Unauthorized.");
            return;
        }

        try {
            const response = await fetch(`https://backend-eta-ashy.vercel.app/api/v1/reservations/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${session.user.accessToken}`,
                },
            });

            if (response.ok) {
                // Remove the deleted booking from the state
                setBookings(bookings.filter(booking => booking._id !== id));
            } else {
                alert('Failed to delete booking.');
            }
        } catch (err) {
            console.error('Error deleting booking:', err);
            alert('An error occurred.');
        }
    };

    if (loading) {
        return <div className="w-full flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="w-full flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
    }

    return (
        <div className="w-full flex flex-col items-center justify-start pt-10 space-y-4">
            {bookings.length === 0 ? (
                <div className="text-gray-700 text-xl font-semibold">No Venue Booking</div>
            ) : (
                bookings.map((bookingItem: BookingItem) => (
                    <div
                        key={bookingItem._id}
                        className="bg-white border-2 border-gray-200 rounded-xl shadow-lg px-6 py-4 w-full max-w-md"
                    >
                        <div className="text-xl font-semibold text-gray-700">
                            Coworking Space: {bookingItem.coworkingSpace.name}
                        </div>
                        <div className="text-xl font-semibold text-gray-700">
                            Booking Date: {dayjs(bookingItem.apptDate).format("DD/MM/YYYY")}
                        </div>

                        <div className="flex justify-between mt-4">
                            <button
                                name="Book Venue"
                                className="rounded-md bg-red-500 hover:bg-red-700 px-4 py-2 text-white font-semibold shadow-md transition-all"
                                onClick={() => handleDelete(bookingItem._id)}
                            >
                                Remove Booking
                            </button>
                            <Link href={`/editbooking?id=${bookingItem._id}`}>
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