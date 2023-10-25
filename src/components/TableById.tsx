"use client";

import React from "react";
import { useGetTableRowByIdQuery } from "@/redux/table/tableApiSlice";
import DataTable from "./DataTable";

import styles from "../sass/layouts/table.module.scss";
import { skipToken } from "@reduxjs/toolkit/query";
import { Balls } from "./Balls";
import AddTableRowForm from "./AddTableRowForm";
import {
  useSearchById,
  useTableActions,
  useTableData,
} from "@/hooks/authHooks";

import { BsSearch } from "react-icons/bs";
function useSafeGetTableRowByIdQuery(id: number | null) {
  const result = useGetTableRowByIdQuery(id === null ? skipToken : id);

  if (id === null) {
    return {
      data: null,
      isLoading: false,
      isError: false,
    };
  }

  return result;
}

const TableById: React.FC = () => {
  const {
    inputValue,
    data,
    isLoading,
    isError,
    handleSearchClick,
    handleInputChange,
  } = useSearchById();

  const { action, setAction, selectedId, setSelectedId } = useTableActions();

  const { handleDelete } = useTableData();

  return (
    <section className={styles.section__table}>
      <div className={`${styles.container} ${styles.table__wrapper}`}>
        <h2 className={styles.section__title}>Search by ID</h2>
        <div className={styles.search__box}>
          <input
            className={styles.input}
            type="text"
            placeholder="Enter ID"
            value={inputValue}
            onChange={handleInputChange}
          />
          <BsSearch
            className={styles.search__icon}
            onClick={handleSearchClick}
          />
        </div>
        {isLoading && <Balls />}
        {isError && <p>Such ID was not found.</p>}
        {data && (
          <DataTable
            data={[data]}
            setAction={setAction}
            setSelectedId={setSelectedId}
            handleDelete={handleDelete}
          />
        )}
        {action && <AddTableRowForm action={action} selectedId={selectedId} />}
      </div>
    </section>
  );
};

export default TableById;
