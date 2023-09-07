import { useState } from "react";
import { useMealsContext } from "../hooks/useMealsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const MealForm = () => {
  const { dispatch } = useMealsContext();
  const { user } = useAuthContext();
  const [mealName, setMealName] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const meal = { mealName, protein, carbs, fats };
    const response = await fetch("/api/meals", {
      method: "POST",
      body: JSON.stringify(meal),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);

      console.log(json.emptyFields);
    }
    if (response.ok) {
      setError(null);
      setMealName("");
      setProtein("");
      setCarbs("");
      setFats("");
      setEmptyFields([]);
      console.log("NEW MEAL ADDED", json);
      dispatch({ type: "CREATE_MEAL", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3 className="heading-box"> ADD A NEW MEAL</h3>
      <label>Meal:</label>
      <input
        type="text"
        onChange={(e) => setMealName(e.target.value)}
        value={mealName}
        className={emptyFields.includes("Name") ? "error" : ""}
      />
      <label>Protein(g):</label>
      <input
        type="number"
        onChange={(e) => setProtein(e.target.value)}
        value={protein}
        className={emptyFields.includes("Protein") ? "error" : ""}
      />
      <label>Carbs(g):</label>
      <input
        type="number"
        onChange={(e) => setCarbs(e.target.value)}
        value={carbs}
        className={emptyFields.includes("Carbs") ? "error" : ""}
      />
      <label>Fats(g):</label>
      <input
        type="number"
        onChange={(e) => setFats(e.target.value)}
        value={fats}
        className={emptyFields?.includes("Fats") ? "error" : ""}
      />
      <button className="btn meal">Add Meal</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default MealForm;
