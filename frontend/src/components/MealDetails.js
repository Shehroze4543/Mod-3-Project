import { useMealsContext } from "../hooks/useMealsContext";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const MealDetails = ({ meal }) => {
  const { dispatch } = useMealsContext();
  const { user } = useAuthContext();
  const [editMode, setEditMode] = useState(false);
  const [editedMeal, setEditedMeal] = useState(meal);

  /////////////////////////////////////////////////////////////
  const handleEdit = async () => {
    if (!user || !user.token) {
      console.error("User is not authenticated.");
      return;
    }
    setEditMode(true);

    try {
      const response = await fetch("/api/meals/" + meal._id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // Include the token in the headers
        },
        body: JSON.stringify(editedMeal),
      });
      console.log(editedMeal);

      if (!response.ok) {
        // Handle server errors or non-JSON responses here
        console.error("Update failed with status:", response.status);
        return;
      }

      const json = await response.json();
      if (response.ok) {
        console.log("Response GOOD");
        dispatch({ type: "UPDATE_MEAL", payload: json });
        //setEditMode(false); // Switch back to view mode after successful update
        setEditMode(true);
      }
      console.log("Response GOOD");
      console.log(json);
      console.log("User:", user);
    } catch (error) {
      // Handle any network or other errors
      console.error("Update failed:", error);
    }
  };
  const handleCancelEdit = () => {
    setEditMode(false); // Cancel editing and switch back to view mode
    setEditedMeal(meal); // Reset the edited workout data to the current workout data
  };

  ////////////////////////////////////////////////////////////////
  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/api/meals/" + meal._id, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_MEAL", payload: json });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/meals/" + meal._id, {
        method: "PATCH", // Use PATCH method for updating
        headers: {
          "Content-Type": "application/json",
          Authorization:  `Bearer ${user.token}`,
        },
        body: JSON.stringify(editedMeal), // Send the edited workout data
      });
      if (!response.ok) {
        // Handle server errors or non-JSON responses here
        console.error("Update failed with status:", response.status);
        return;
      }
      const json = await response.json();
      if (response.ok) {
        console.log("Response is ok");
        dispatch({ type: "UPDATE_MEAL", payload: json });
        setEditMode(true); // Switch back to view mode after successful update
      }
    } catch (error) {
      // Handle any network or other errors
      console.error("Update failed:", error);
    }
  };
  return (
    <div className="meal-details">
      {/* <h4>{meal.mealName}</h4> */}
      {editMode ? (
        <form>
          <label className="label"> Meal:</label>
          <input
          className="box" 
            type="text"
            value={editedMeal.mealName}
            onChange={(e) => {
              const newValue = e.target.value;
              setEditedMeal((prevState) => ({
                ...prevState,
                mealName: newValue,
              }));
              console.log("Edited Meal:", editedMeal);
            }}
            // onChange={(e) =>
            //   console.log(
            //     setEditedMeal({ ...editedMeal, mealName: e.target.value })
            //   )
            // }
          />

          <label className="label"> Protein:</label>
          <input
             className="box" 
            type="number"
            value={editedMeal.protein}
            onChange={(e) => {
              const newValue = e.target.value;
              setEditedMeal((prevState) => ({
                ...prevState,
                protein: newValue,
              }));
              console.log("Edited Meal:", editedMeal);
            }}
          />
          <label className="label">  Carbs:</label>
          <input
             className="box" 
            type="number"
            value={editedMeal.carbs}
            onChange={(e) => {
              const newValue = e.target.value;
              setEditedMeal((prevState) => ({
                ...prevState,
                carbs: newValue,
              }));
              console.log("Edited Meal:", editedMeal);
            }}
          />

<label className="label">  Fats:</label>
          <input
             className="box" 
            type="number"
            value={editedMeal.fats}
            onChange={(e) => {
              const newValue = e.target.value;
              setEditedMeal((prevState) => ({
                ...prevState,
                fats: newValue,
              }));
              console.log("Edited Meal:", editedMeal);
            }}
          />
          {/* Add input fields for load, reps, and other properties */}
          <button onClick={handleSubmit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </form>
      ) : (
        <>
        <div className="meal-display">
         <div className="display-heading ">
          <h4>{meal.mealName}</h4>
          </div>
     
          <div className="display-main ">
          <p> <strong>Protein (g):</strong>
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
          </div>
          <div className="display-cal">
          <p>
            <strong>Total Calories:</strong>
            {meal.calories}
          </p>
          </div>
          <div className="display-btn ">
          <button className="btn" onClick={handleClick}>Delete</button>
          <button className="btn" onClick={handleEdit}>EDIT</button>
          </div>
          </div>  </>
      )}
    </div>
  );
};

export default MealDetails;
