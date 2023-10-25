import React from "react";
import styles from "../sass/layouts/table.module.scss";
import { BsArrowRepeat } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { DataTableProps } from "@/types/types";

const DataTable: React.FC<DataTableProps> = ({
  data,
  setAction,
  setSelectedId,
  handleDelete,
}) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Birthday</th>
          <th>Phone</th>
          <th>Address</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
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
                onClick={() => handleDelete(row.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
