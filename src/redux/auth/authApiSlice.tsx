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
      { token: string | null; status: number },
      { username: string; password: string }
    >({
      query: (credentials) => ({
        url: "/login/",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: ApiResponse, meta) => {
        return {
          token: response.data?.token || null,
          status: meta?.response?.status || 0,
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

export const { useLoginMutation } = authApi;
