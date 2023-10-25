"use client";

import {
  useGetTableRowByIdQuery,
  usePatchTableDataMutation,
  usePostTableDataMutation,
  useUpdateTableDataMutation,
} from "@/redux/table/tableApiSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "../sass/layouts/login.module.scss";
import { AddTableRowFormProps, ErrorFeedbackProps } from "@/types/types";
import { Balls } from "./Balls";

import { tableDataSchema } from "../validationSchemas";
import { skipToken } from "@reduxjs/toolkit/query";

const AddTableRowForm: React.FC<AddTableRowFormProps> = ({
  action,
  selectedId,
}) => {
  const [postTableData, { isLoading, data, error }] =
    usePostTableDataMutation();
  const [patchTableData] = usePatchTableDataMutation();
  const [updateTableData] = useUpdateTableDataMutation();

  const { data: tableRowData } = useGetTableRowByIdQuery(
    action === "PATCH" && selectedId ? selectedId : skipToken
  );

  let formInitialValues = {
    name: "",
    email: "",
    birthday_date: "",
    phone_number: "",
    address: "",
  };

  if (action === "PATCH" && tableRowData) {
    formInitialValues = tableRowData;
  }

  let buttonText = "";
  switch (action) {
    case "PUT":
      buttonText = "Edit";
      break;
    case "PATCH":
      buttonText = "Update";
      break;
    default:
    case "POST":
      buttonText = "Add";
  }

  const ErrorFeedback: React.FC<ErrorFeedbackProps> = ({ name }) => {
    return (
      <ErrorMessage name={name}>
        {(errorMessage) => <span className={styles.error}>{errorMessage}</span>}
      </ErrorMessage>
    );
  };

  return (
    <section>
      <div className={`${styles.container} ${styles.table__wrapper} `}>
        <div className={styles.formik}>
          {isLoading && <Balls />}
          {error && <div>Error</div>}
          <Formik
            key={`${action}-${selectedId || "new"}`}
            initialValues={formInitialValues}
            onSubmit={(values, { resetForm }) => {
              switch (action) {
                case "POST":
                  postTableData(values);
                  break;
                case "PATCH":
                  if (selectedId !== null) {
                    patchTableData({ id: selectedId, data: values });
                  }
                  break;
                case "PUT":
                  if (selectedId !== null) {
                    updateTableData({ id: selectedId, data: values });
                  }
                  break;
                default:
                  console.error("Invalid action type");
              }

              resetForm();
            }}
            validationSchema={tableDataSchema}
          >
            {({ errors, touched }) => (
              <Form className={styles.form}>
                <div className={styles.form__box}>
                  <label className={styles.label}>
                    Name:
                    <Field
                      className={styles.input}
                      type="text"
                      name="name"
                      error={touched.name && errors.name}
                    />
                  </label>
                  <ErrorFeedback name="name" />
                </div>

                <div className={styles.form__box}>
                  <label className={styles.label}>
                    Email:
                    <Field
                      className={styles.input}
                      type="email"
                      name="email"
                      error={touched.email && errors.email}
                    />
                  </label>
                  <ErrorFeedback name="email" />
                </div>

                <div className={styles.form__box}>
                  <label className={styles.label}>
                    Birthday Date:
                    <Field
                      className={styles.input}
                      name="birthday_date"
                      type="date"
                      error={touched.birthday_date && errors.birthday_date}
                    />
                  </label>

                  <ErrorFeedback name="birthday_date" />
                </div>

                <div className={styles.form__box}>
                  <label className={styles.label}>
                    Phone Number:
                    <Field
                      className={styles.input}
                      name="phone_number"
                      type="tel"
                      error={touched.phone_number && errors.phone_number}
                    />
                  </label>

                  <ErrorFeedback name="phone_number" />
                </div>
                <div className={styles.form__box}>
                  <label className={styles.label}>
                    Address:
                    <Field
                      className={styles.input}
                      name="address"
                      type="text"
                      error={touched.address && errors.address}
                    />
                  </label>

                  <ErrorFeedback name="address" />
                </div>

                <button className={styles.styledBtn} type="submit">
                  {buttonText}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default AddTableRowForm;
