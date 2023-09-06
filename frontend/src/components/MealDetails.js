import { useMealsContext } from "../hooks/useMealsContext";
const MealDetails = ({ meal }) => {
  const { dispatch } = useMealsContext();

  const handleClick = async () => {
    const response = await fetch("/api/meals/" + meal._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_MEAL", payload: json });
    }
  };
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
        <strong>Total Calories:</strong>
        {meal.calories}
      </p>
      <button onClick={handleClick}>delete</button>
    </div>
  );
};

export default MealDetails;
