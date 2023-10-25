"use client";

import React, { useEffect } from "react";

import Pagination from "./Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "@/redux/table/paginationSlice";
import { RootState } from "@/types/types";
import { Balls } from "./Balls";
import AddTableRowForm from "./AddTableRowForm";
import DataTable from "./DataTable";

import styles from "../sass/layouts/table.module.scss";
import { useTableActions, useTableData } from "@/hooks/authHooks";

const Table: React.FC = () => {
  const { action, setAction, selectedId, setSelectedId } = useTableActions();
  const { data, isLoading, isError, error, handleDelete } = useTableData();

  const dispatch = useDispatch();
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage
  );

  useEffect(() => {
    dispatch(setCurrentPage(currentPage));
  }, [currentPage, dispatch]);

  if (isLoading) return <Balls />;
  if (isError) return <div>Error</div>;

  return (
    <section className={styles.section__table}>
      <div className={`${styles.container} ${styles.table__wrapper}`}>
        <DataTable
          data={data ? data.results : []}
          setAction={setAction}
          setSelectedId={setSelectedId}
          handleDelete={handleDelete}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil((data?.count || 0) / 10)}
          onPageChange={(page) => dispatch(setCurrentPage(page))}
        />
      </div>
      {action && <AddTableRowForm action={action} selectedId={selectedId} />}
    </section>
  );
};

export default Table;
