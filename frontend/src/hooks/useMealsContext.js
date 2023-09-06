import { MealsContext } from "../context/MealsContext";
import { useContext } from "react";

export const useMealsContext = () => {
  const context = useContext(MealsContext);

  if (!context) {
    throw Error(
      "useWorkoutsContext must be used inside an WorkoutsContext Provider"
    );
  }
  return context;
};
