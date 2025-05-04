import express from "express";
import {
    createMealLogController,
    getAllMealLogController,
    getMealLogController,
    updateMealLogController,
    deleteMealLogController,
} from "../controllers/mealLog.controller.js/";

const router = express.Router();

router.post("/create", createMealLogController);
router.get("/", getAllMealLogController);
router.get("/:id", getMealLogController);
router.put("/:id", updateMealLogController);
router.delete("/:id", deleteMealLogController);

export default router;
