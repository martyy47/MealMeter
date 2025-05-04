import mongoose from "mongoose";

const MealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter meal name"],
  },
  description: {
    type: String,
    required: [true, "Please enter meal description"],
  },
});

const Meal = mongoose.model("Meal", MealSchema);

export default Meal;
