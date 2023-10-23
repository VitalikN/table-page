import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://technical-task-api.icapgroupgmbh.com/api",
  }),
  tagTypes: ["User", "auth"],
  endpoints: (builder) => ({
    login: builder.mutation<void, { username: string; password: string }>({
      query: (credentials) => ({
        url: "/login/",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});
export const { useLoginMutation } = authApi;
