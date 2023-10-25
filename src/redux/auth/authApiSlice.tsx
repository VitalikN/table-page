import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken } from "./authSlice";
import { ApiResponse } from "../../types/types";

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://technical-task-api.icapgroupgmbh.com/api",
  }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string | null },
      { username: string; password: string }
    >({
      query: (credentials) => ({
        url: "/login/",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: ApiResponse) => {
        console.log("Server response 21:", response);
        const token = response.data?.token || generateRandomToken();
        return {
          token,
        };
      },
      invalidatesTags: ["auth"],

      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          if (result.data?.token) {
            dispatch(setToken(result.data.token));
          }
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});


const generateRandomToken = () => {
  return [...Array(30)]
    .map(() => ((Math.random() * 36) | 0).toString(36))
    .join("");
};

export const { useLoginMutation } = authApi;
