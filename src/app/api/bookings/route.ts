// src/app/api/bookings/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/authOptions';
import mongoose from 'mongoose';
import { dbConnect } from '@/db/dbConnect';

const ReservationSchema = new mongoose.Schema({
  apptDate: { type: Date, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  coworkingSpace: { type: mongoose.Schema.ObjectId, ref: 'CoworkingSpace', required: true },
  createdAt: { type: Date, default: Date.now },
});

const Reservation = mongoose.models.Reservation || mongoose.model('Reservation', ReservationSchema);

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const body = await request.json();
    const { apptDate, coworkingSpace } = body;

    if (!apptDate || !coworkingSpace) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const newReservation = new Reservation({
      apptDate: new Date(apptDate),
      user: session.user._id, // Assuming session.user.id is the ObjectId of the user
      coworkingSpace: coworkingSpace,
    });

    await newReservation.save();

    return NextResponse.json(newReservation, { status: 201 });
  } catch (error) {
    console.error('Error adding reservation:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const { id } = params;
    const body = await request.json();
    const { apptDate, coworkingSpace } = body;

    const updatedReservation = await Reservation.findOneAndUpdate(
      { _id: id, user: session.user._id },
      { apptDate: new Date(apptDate), coworkingSpace: coworkingSpace },
      { new: true }
    );

    if (!updatedReservation) {
      return NextResponse.json({ message: 'Reservation not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json(updatedReservation);
  } catch (error) {
    console.error('Error editing reservation:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const { id } = params;

    const deletedReservation = await Reservation.findOneAndDelete({ _id: id, user: session.user._id });

    if (!deletedReservation) {
      return NextResponse.json({ message: 'Reservation not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const reservations = await Reservation.find({ user: session.user._id });
    return NextResponse.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}