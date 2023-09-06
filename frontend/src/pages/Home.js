import { useEffect } from "react";
import { useMealsContext } from "../hooks/useMealsContext";
import { useAuthContext } from "../hooks/useAuthContext";
// components
import MealDetails from "../components/MealDetails";
import MealForm from "../components/MealForm";
const Home = () => {
  //const [meals, setMeals] = useState(null);
  const { meals, dispatch } = useMealsContext();
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch("/api/meals", {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const json = await response.json();

      if (response.ok) {
        // setMeals(json);
        dispatch({ type: "SET_MEALS", payload: json });
      }
    };
    if (user) {
      fetchMeals();
    }
  }, [dispatch, meals, user]);
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
