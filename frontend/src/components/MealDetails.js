import { useMealsContext } from "../hooks/useMealsContext";

import { useAuthContext } from "../hooks/useAuthContext";

const MealDetails = ({ meal }) => {
  const { dispatch } = useMealsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/api/meals/" + meal._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
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
      <span></span>
      <button onClick={handleClick}>delete</button>
    </div>
  );
};

export default MealDetails;
