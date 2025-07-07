import mongoose from "mongoose";
import dotenv from "dotenv";
import Car from "./models/car.js";
import { dummyCars } from "./dummydata.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB Connected")
        return Car.insertMany(dummyCars)
    }).then(() => {
        console.log('dummy car data inserted succesfully');
        process.exit();
    })
    .catch((err) => console.log(err));