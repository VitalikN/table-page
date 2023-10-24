import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ResponseData, QueryArg, TableData } from "../../types/types";

export const tableApi = createApi({
  reducerPath: "table",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://technical-task-api.icapgroupgmbh.com/api",
  }),
  endpoints: (builder) => ({
    getTableData: builder.query<ResponseData, QueryArg>({
      query: (page) => `table/?limit=10&offset=${(page - 1) * 10}`,
    }),
    postTableData: builder.mutation<TableData, TableData>({
      query: (newData) => ({
        url: "/table/",
        method: "POST",

        body: newData,
      }),
    }),
    updateTableData: builder.mutation<
      TableData,
      { id: number; data: TableData }
    >({
      query: ({ id, data }) => ({
        url: `/table/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    patchTableData: builder.mutation<
      TableData,
      { id: number; data: TableData }
    >({
      query: ({ id, data }) => ({
        url: `/table/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteTableData: builder.mutation<void, number>({
      query: (id) => ({
        url: `/table/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTableDataQuery,
  usePostTableDataMutation,
  useUpdateTableDataMutation,
  usePatchTableDataMutation,
  useDeleteTableDataMutation,
} = tableApi;
