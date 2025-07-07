import mongoose from "mongoose";
import dotenv from "dotenv";
import Booking from "./models/booking.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("MongoDB Connected for Booking Seed");
  insertBookings();
});

async function insertBookings() {
  try {
    await Booking.deleteMany(); // Optional: Clears old bookings

    const dummyBookings = [
      {
        _id: "68482bcc98eb9722b7751f70",
        car: "6867badb51b38d18377dc752",
        user: "6847f7cab3d8daecdb517095",
        owner: "6847f7cab3d8daecdb517095",
        pickupDate: "2025-06-13T00:00:00.000Z",
        returnDate: "2025-06-14T00:00:00.000Z",
        status: "confirmed",
        price: 440,
        createdAt: "2025-06-10T12:57:48.244Z",
      },
      {
        _id: "68482bb598eb9722b7751f60",
        car: "6867badb51b38d18377dc753",
        user: "6847f7cab3d8daecdb517095",
        owner: "67fe3467ed8a8fe17d0ba6e2",
        pickupDate: "2025-06-12T00:00:00.000Z",
        returnDate: "2025-06-12T00:00:00.000Z",
        status: "pending",
        price: 130,
        createdAt: "2025-06-10T12:57:25.613Z",
      },
    ];

    await Booking.insertMany(dummyBookings);
    console.log("Dummy bookings inserted successfully");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
