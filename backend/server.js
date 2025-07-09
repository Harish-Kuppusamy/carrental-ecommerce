import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Car from "./models/car.js";
import Booking from "./models/booking.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET;

// Middlewares
const allowedOrigins = ["https://carrental-ecommerce.vercel.app"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// User Schema & Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
});

const User = mongoose.model("user", userSchema);

// Auth Routes
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role:role || "user"
    });

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User Registered",
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ message: "Login successful", token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Car Routes
app.get("/api/cars", async (_req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cars" });
  }
});

app.post("/api/cars", async (req, res) => {
  try {
    const newCar = new Car(req.body);
    const savedCar = await newCar.save();

    res.status(201).json({ message: "Car added successfully", car: savedCar });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add car" });
  }
});

// Booking Routes
app.get("/api/bookings", async (_req, res) => {
  try {
    const bookings = await Booking.find().populate("car");
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

app.post("/api/bookings", async (req, res) => {
  try {
    const { car, user, owner, pickupDate, returnDate, status, price } =
      req.body;

    if (!car || !user || !pickupDate || !returnDate)
      return res.status(400).json({ error: "Missing required fields" });

    const newBooking = new Booking({
      car,
      user,
      owner,
      pickupDate,
      returnDate,
      status: status || "pending",
      price,
      createdAt: new Date(),
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Booking failed" });
  }
});

app.put("/api/bookings/:id", async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updatedBooking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update status" });
  }
});

app.put("/api/bookings/:id/update-status", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedBooking)
      return res.status(404).json({ message: "Booking not found" });

    res.json(updatedBooking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update booking" });
  }
});

app.delete("/api/bookings/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking Cancelled Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to cancel booking" });
  }
});

// Payment Routes
app.use("/api/payment", paymentRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚗 Server running on port ${PORT}`);
});
