"use client";

import {
  useDeleteTableDataMutation,
  useGetTableDataQuery,
} from "@/redux/table/tableApiSlice";
import React, { useEffect, useState } from "react";

import { BsArrowRepeat } from "react-icons/bs";
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";

import styles from "../sass/layouts/table.module.scss";
import Pagination from "./Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "@/redux/table/paginationSlice";
import { RootState, Action } from "@/types/types";
import AddTableRowForm from "./AddTableRowForm";
import { Balls } from "./Balls";

const Table: React.FC = () => {
  const [action, setAction] = useState<Action>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
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

  if (isLoading) return <Balls />;
  if (isError) return <div>Error</div>;

  return (
    <section className={styles.section__table}>
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
              <th>
                <AiOutlinePlus
                  className={styles.icon}
                  onClick={() => setAction("POST")}
                />
              </th>
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
                  <td>
                    <BsArrowRepeat
                      className={styles.icon}
                      onClick={() => {
                        setAction("PUT");
                        setSelectedId(row.id || null);
                      }}
                    />
                    <AiFillEdit
                      className={styles.icon}
                      onClick={() => {
                        setAction("PATCH");
                        setSelectedId(row.id || null);
                      }}
                    />
                    <MdDeleteForever
                      className={styles.icon}
                      onClick={() => row.id && handleDelete(row.id)}
                    />
                  </td>
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

      {action && <AddTableRowForm action={action} selectedId={selectedId} />}
    </section>
  );
};

export default Table;
