import mealLog from "../models/mealLog.model.js";

export const createMealLog = async (mealLogData) => {
    const exercise = new Exercise(mealLogData);
    return await mealLog.save();
}

export const getAllMealLog = async () => {
    return await mealLog.find();
}

export const getMealLogById = async (id) => {
    return await mealLog.findById(id);
}

export const updateMealLog = async (id, mealLog) => {
    return await mealLog.findByIdAndUpdate(id, mealLog);
}

export const deleteMealLog = async (id) => {
    return await mealLog.findByIdAndDelete(id);
}