import {
    createMealLog,
    getAllMealLog,
    getMealLogById,
    updateMealLog,
    deleteMealLog,
  } from "../dao/mealLog.dao.js";
  import { updateMealLog } from "../dao/mealLog.dao.js"; // Import function to update meals
  
  // Vytvori
  export const createMealLogController = async (req, res) => {
    const { name, description } = req.body;
  
    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "Name and description are required." });
    }
  
    try {
      const newMealLog = await createMealLog({
        name,
        description,
      });
      res.status(201).json(newMealLog);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error while saving MealLog." });
    }
  };
  
  // Vraci vsechny
  export const getAllMealLogController = async (req, res) => {
    try {
      const mealLog = await getAllMealLog();
      res.json(mealLog);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  // Vraci podle id
  export const getMealLogByIdController = async (req, res) => {
    try {
      const mealLog = await getMealLogById(req.params.id);
      if (!mealLog)
        return res.status(404).json({ message: "MealLog not found" });
      res.json(mealLog);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  // upravi podle id
  export const updateMealLogController = async (req, res) => {
    try {
      const { id } = req.params;
  
      const mealLog = await updateMealLog(id, req.body);
      if (!mealLog)
        return res.status(404).json({ message: "MealLog not found" });
  
      const updatedMealLog = await getMealLogById(id);
      res.json(updatedMealLog);
    } catch (error) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  // smazani podle id
  export const deleteMealLogController = async (req, res) => {
    try {
      const { id } = req.params;
  
      const mealLog = await deleteMealLog(id);
      if (!mealLog)
        return res.status(404).json({ message: "MealLog not found" });
  
      // Remove the ID
      await updateWorkoutMealLog(id);
  
      res.status(200).json({ message: "MealLog deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };