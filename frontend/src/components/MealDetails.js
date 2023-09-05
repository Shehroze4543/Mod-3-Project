const MealDetails = ({ meal }) => {
  return (
    <div className="meal-details">
      <h4>{meal.mealName}</h4>
      <p>
        <strong>Protein (g):</strong>
        {meal.protein}
      </p>
      <p>
        <strong>Carbs (g):</strong>
        {meal.carbs}
      </p>
      <p>
        <strong>Fats (g):</strong>
        {meal.fats}
      </p>
      <p>
        <strong>Total Calories::</strong>
        {meal.calories}
      </p>
    </div>
  );
};

export default MealDetails;
