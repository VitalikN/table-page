import { useDispatch } from "react-redux";
import { useLoginMutation } from "../redux/auth/authApiSlice"; // Замініть на відповідний шлях до файлу
import { useEffect } from "react";
import { setToken } from "@/redux/auth/authSlice";
import { useGetTableDataQuery } from "@/redux/table/tableApiSlice";

export const useAuth = () => {
  const [login, { data, isLoading, isError, error }] = useLoginMutation();

  const dispatch = useDispatch();
  useEffect(() => {
    if (data && data.token) {
      dispatch(setToken(data.token));
    }
  }, [data, dispatch]);

  return {
    login,
    data,
    isLoading,
    isError,
    error,
  };
};
