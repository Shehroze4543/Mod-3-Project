import { useEffect } from "react";
import { useMealsContext } from "../hooks/useMealsContext";
// components
import MealDetails from "../components/MealDetails";
import MealForm from "../components/MealForm";
const Home = () => {
  //const [meals, setMeals] = useState(null);
  const { meals, dispatch } = useMealsContext();
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch("/api/meals");
      const json = await response.json();

      if (response.ok) {
        // setMeals(json);
        dispatch({ type: "SET_MEALS", payload: json });
      }
    };
    fetchMeals();
  }, [dispatch, meals]);
  return (
    <>
      <div className="home">
        <div className="workouts">
          {meals &&
            meals.map((meal) => {
              return <MealDetails meal={meal} key={meal._id} />;
            })}
        </div>
        <MealForm />
      </div>
    </>
  );
};

export default Home;
