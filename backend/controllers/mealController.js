const Meal = require("../models/mealModel");
const mongoose = require("mongoose");

function calculateTotalCalories(protein, carbs, fats) {
  return fats * 9 + protein * 4 + carbs * 4;
}

const getMeals = async (req, res) => {
  const meals = await Meal.find({}).sort({ createdAt: -1 });

  res.status(200).json(meals);
};

// get a single meal
const getMeal = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Meal" });
  }
  const meal = await Meal.findById(id);
  if (!meal) {
    return res.status(404).json({ error: "No such Meal" });
  }
  res.status(200).json({ meal });
};

// create a meal
const createMeal = async (req, res) => {
  // Function to calculate total calories

  const { mealName, protein, carbs, fats } = req.body;
  const calories = calculateTotalCalories(protein, carbs, fats);

  let emptyFields = [];
  if (!mealName) {
    emptyFields.push("Name");
  }
  if (!protein) {
    emptyFields.push("Protein");
  }
  if (!carbs) {
    emptyFields.push("Carbs");
  }
  if (!fats) {
    emptyFields.push("Fats");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const meal = await Meal.create({
      mealName,
      protein,
      carbs,
      fats,
      calories,
    });

    res.status(200).json({ meal });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// delete a meal
const deleteMeal = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Meal" });
  }

  const meal = await Meal.findOneAndDelete({ _id: id });

  if (!meal) {
    return res.status(404).json({ error: "No such Meal" });
  }
  res.status(200).json({ meal });
};

// update a meal

const updateMeal = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Meal" });
  }
  try {
    const meal = await Meal.findById(id);

    if (!meal) {
      return res.status(404).json({ error: "No such Meal" });
    }
    // Update the meal fields with the request body
    meal.set(req.body);

    // Save the updated meal, which will trigger the pre-save middleware
    await meal.save();

    res.status(200).json({ meal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createMeal,
  getMeal,
  getMeals,
  deleteMeal,
  updateMeal,
};
