import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ResponseData, QueryArg } from "../../types/types";

export const tableApi = createApi({
  reducerPath: "table",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://technical-task-api.icapgroupgmbh.com/api",
  }),
  endpoints: (builder) => ({
    getTableData: builder.query<ResponseData, QueryArg>({
      query: (page) => `table/?limit=10&offset=${(page - 1) * 10}`,
    }),
  }),
});

export const { useGetTableDataQuery } = tableApi;
