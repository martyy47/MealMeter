import express from "express";
import {
    createMealController,
    getAllMealController,
    getMealController,
    updateMealController,
    deleteMealController,
} from "../controllers/mealLog.controller.js/";

const router = express.Router();

router.post("/create", createMealController);
router.get("/", getAllMealController);
router.get("/:id", getMealController);
router.put("/:id", updateMealController);
router.delete("/:id", deleteMealController);

export default router;
