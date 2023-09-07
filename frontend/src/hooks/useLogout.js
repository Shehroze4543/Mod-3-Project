import { useAuthContext } from "./useAuthContext";
import { useMealsContext } from "./useMealsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchMeals } = useMealsContext();

  const logout = async () => {
    // dispatch logout action
    await dispatchMeals({ type: "SET_MEALS", payload: null });

    await dispatch({ type: "LOGOUT" });
    // remove user from storage
    localStorage.removeItem("user");
  };

  return { logout };
};
