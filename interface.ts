export interface VenueItem {
  _id: string;
  name: string;
  address: string;
  tel: string;
  Open_time: string;
  Close_time: string;
  __v?: number; // Optional, if it exists in the response
  id?: string; // Optional, if it exists in the response
}

export interface VenueJson {
  success: boolean;
  count: number;
  pagination?: Object; // Optional, if it exists in the response
  data: VenueItem[];
}

  export interface BookingItem {
    _id: string; // Assuming _id is the bookingId in your database
    apptDate: string; // Or Date, depending on how you store it
    coworkingSpace: string; // Or ObjectId, depending on your database setup
  }
