import mongoose from "mongoose";
import Meal from "./Exercise.model.js";

const WorkoutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"]
    },
    description: {
      type: String,
      required: false,
    },
    meal: [
      {
        meal: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Meal",
          required: [true, "Meal reference is required"],
        },
        calories: {
          type: Number,
          required: [true, "Please enter calories"],
        },
      },
    ],
  },
  { timestamps: true }
);

const Meal = mongoose.model("Meal", MealSchema);

export default Meal;
