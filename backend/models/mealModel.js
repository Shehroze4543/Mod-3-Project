const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mealsSchema = new Schema(
  {
    mealName: {
      type: String,
      required: true,
    },
    protein: {
      type: Number,
      required: true,
    },
    carbs: {
      type: Number,
      required: true,
    },
    fats: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
mealsSchema.pre("save", function (next) {
  this.calories = this.protein * 4 + this.carbs * 4 + this.fats * 9;
  next();
});
module.exports = mongoose.model("Meal", mealsSchema);
