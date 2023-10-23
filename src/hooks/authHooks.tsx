import { useLoginMutation } from "../redux/auth/authApiSlice"; // Замініть на відповідний шлях до файлу

export const useAuth = () => {
  const [login, { data, isLoading, isError, error }] = useLoginMutation();

  return {
    login,
    data,
    isLoading,
    isError,
    error,
  };
};
