const express = require("express");
const Meal = require("../models/mealModel");
const {
  createMeal,
  getMeal,
  getMeals,
  deleteMeal,
  updateMeal,
} = require("../controllers/mealController");
const router = express.Router();

// GET ALL MEALS
router.get("/", getMeals);

// GET A SINGLE MEAL
router.get("/:id", getMeal);

// POST A NEW MEAL
router.post("/", createMeal);

// DELETE A SINGLE MEAL
router.delete("/:id", deleteMeal);

// UPDATE A SINGLE MEAL
router.patch("/:id", updateMeal);

module.exports = router;
