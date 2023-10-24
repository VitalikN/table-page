import { useDispatch } from "react-redux";
import { useLoginMutation } from "../redux/auth/authApiSlice"; // Замініть на відповідний шлях до файлу
import { useEffect } from "react";
import { setToken } from "@/redux/auth/authSlice";
import { useRouter } from "next/navigation";
export const useAuth = () => {
  const [login, { data, isLoading, isError, error }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (data && data.token) {
      dispatch(setToken(data.token));
      router.push("/");
    }
  }, [data, dispatch, router]);

  return {
    login,
    data,
    isLoading,
    isError,
    error,
  };
};
