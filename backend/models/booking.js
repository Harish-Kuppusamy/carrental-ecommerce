import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    pickupDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    status: { type: String, default: "pending" },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Booking = mongoose.model("booking", bookingSchema);

export default Booking;
