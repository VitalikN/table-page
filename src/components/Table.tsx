"use client";

import { useGetTableDataQuery } from "@/redux/table/tableApiSlice";
import React, { useEffect, useState } from "react";

import styles from "../sass/layouts/table.module.scss";
import Pagination from "./Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "@/redux/table/paginationSlice";
import { RootState } from "@/types/types";

const Table: React.FC = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage
  );

  const { data, isLoading, isError, error } = useGetTableDataQuery(currentPage);

  useEffect(() => {
    dispatch(setCurrentPage(currentPage));
  }, [currentPage, dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <section>
      <div className={`${styles.container} ${styles.table__wrapper}`}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Birthday</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.results.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.birthday_date}</td>
                  <td>{row.phone_number}</td>
                  <td>{row.address}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil((data?.count || 0) / 10)}
          onPageChange={(page) => dispatch(setCurrentPage(page))}
        />
      </div>
    </section>
  );
};

export default Table;
