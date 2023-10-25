"use client";

import { useLoginMutation } from "../redux/auth/authApiSlice"; // Замініть на відповідний шлях до файлу
import { setToken } from "@/redux/auth/authSlice";
import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";
import { Action } from "@/types/types";

import {
  useDeleteTableDataMutation,
  useGetTableDataQuery,
} from "@/redux/table/tableApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "@/redux/table/paginationSlice";
import { RootState } from "@/types/types";

import { useGetTableRowByIdQuery } from "@/redux/table/tableApiSlice";
import { skipToken } from "@reduxjs/toolkit/query";

export const useSearchById = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchId, setSearchId] = useState<number | null>(null);
  const { data, isLoading, isError } = useGetTableRowByIdQuery(
    searchId === null ? skipToken : searchId
  );

  const handleSearchClick = () => {
    const parsedValue = parseInt(inputValue, 10);
    if (!isNaN(parsedValue)) {
      setSearchId(parsedValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]+$/.test(value)) {
      setInputValue(value);
    }
  };

  return {
    inputValue,
    data,
    isLoading,
    isError,
    handleSearchClick,
    handleInputChange,
  };
};

export const useTableData = () => {
  const [deleteTableData] = useDeleteTableDataMutation();

  const dispatch = useDispatch();
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage
  );
  const { data, isLoading, isError, error } = useGetTableDataQuery(currentPage);

  const handleDelete = (id: number) => {
    deleteTableData(id);
  };

  useEffect(() => {
    dispatch(setCurrentPage(currentPage));
  }, [currentPage, dispatch]);

  return {
    data,
    isLoading,
    isError,
    error,
    handleDelete,
  };
};

export const useTableActions = () => {
  const [action, setAction] = useState<Action>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return {
    action,
    setAction,
    selectedId,
    setSelectedId,
  };
};

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
