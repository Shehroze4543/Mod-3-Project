import { useState } from "react";

const MealForm = () => {
  const [mealName, setMealName] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const meal = { mealName, protein, carbs, fats };
    const response = await fetch("/api/meals", {
      method: "POST",
      body: JSON.stringify(meal),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setMealName("");
      setProtein("");
      setCarbs("");
      setFats("");
      setError(null);
      console.log("New Workout Added", json);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3> Add a new meal</h3>

      <label>Meal:</label>
      <input
        type="text"
        onChange={(e) => setMealName(e.target.value)}
        value={mealName}
      />

      <label>Protein(g):</label>
      <input
        type="number"
        onChange={(e) => setProtein(e.target.value)}
        value={protein}
      />
      <label>Carbs(g):</label>
      <input
        type="number"
        onChange={(e) => setCarbs(e.target.value)}
        value={carbs}
      />
      <label>Fats(g):</label>
      <input
        type="number"
        onChange={(e) => setFats(e.target.value)}
        value={fats}
      />
      <button>Add Meal</button>
    </form>
  );
};

export default MealForm;
