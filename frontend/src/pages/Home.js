import { useEffect, useState } from "react";

// components
import MealDetails from "../components/MealDetails";
import MealForm from "../components/MealForm";
const Home = () => {
  const [meals, setMeals] = useState(null);

  useEffect(() => {
    const fetchMeal = async () => {
      const response = await fetch("/api/meals");
      const json = await response.json();

      if (response.ok) {
        setMeals(json);
      }
    };
    fetchMeal();
  }, []);
  return (
    <div className="home">
      <MealForm />

      <div className="meals">
        {meals &&
          meals.map((meal) => {
            return <MealDetails key={meal._id} meal={meal} />;
          })}
      </div>
    </div>
  );
};

export default Home;
