const express = require("express");
//const Meal = require("../models/mealModel");
const {
  createMeal,
  getMeal,
  getMeals,
  deleteMeal,
  updateMeal,
} = require("../controllers/mealController");


const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth)


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
