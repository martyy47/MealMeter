import Meal from "../models/meal.model.js";
import mongoose from "mongoose";

export const createMeal = async (mealData) => {
  const meal = new Meal(mealData);
  return await meal.save();
};

export const getAllMeal = async () => {
  return await Meal.find().populate("meals.meal");
};

export const getMealById = async (id) => {
  return await Meal.findById(id).populate("meals.meal");
};

export const updateMeal = async (id, meal) => {
  return await Meal.findByIdAndUpdate(id, meal);
};

export const deleteMeal = async (id) => {
  return await Meal.findByIdAndDelete(id);
};

export const updateMealMealLogs = async (exerciseId) => {
  try {
    const objectId = new mongoose.Types.ObjectId(exerciseId);

    await Meal.updateMany(
      {},
      {
        $pull: {
          meal: {
            meal: objectId,
          },
        },
      }
    );
  } catch (error) {
    console.error("Error updating meals:", error);
    throw error;
  }
};
