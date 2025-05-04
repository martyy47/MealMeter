import {
    createMeal,
    getAllMeal,
    getMealById,
    updateMeal,
    deleteMeal
  } from "../dao/meal.dao.js";
  
  // Vytvori meal
  export const createMealController = async (req, res) => {
    const { name, description, meal } = req.body;
  
    if (!name || !Array.isArray(meal) || meal.length === 0) {
      return res
        .status(400)
        .json({ message: "Name and at least one meal are required." });
    }
  
    for (const ex of meal) {
      if (!ex.meal || !ex.calories) {
        return res.status(400).json({
          message: "Each meal must have calories.",
        });
      }
    }
  
    try {
      const newMeal = await createMeal({ name, description, meal });
      res.status(201).json(newMeal);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error while saving meal." });
    }
  };
  
  // Vraci vsechny jidla
  export const getAllMealController = async (_, res) => {
    try {
      const meal = await getAllMeal();
      res.json(meal);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  // Vraci jidla podle id
  export const getMealByIdController = async (req, res) => {
    try {
      const meal = await getMealById(req.params.id);
      if (!meal) return res.status(404).json({ message: "Meal not found" });
      res.json(meal);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  export const updateMealController = async (req, res) => {
    try {
      const { id } = req.params;
  
      const meal = await updateMeal(id, req.body);
      if (!meal) return res.status(404).json({ message: "Meal not found" });
  
      const updatedMeal = await getMealById(id);
      res.status(200).json(updatedMeal);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  export const deleteMealController = async (req, res) => {
    try {
      const { id } = req.params;
  
      const meal = await deleteMeal(id);
      if (!meal) return res.status(404).json({ message: "Meal not found" });
  
      res.status(200).json({ message: "Meal deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
  