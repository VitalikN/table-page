"use client";

import {
  usePatchTableDataMutation,
  usePostTableDataMutation,
  useUpdateTableDataMutation,
} from "@/redux/table/tableApiSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "../sass/layouts/login.module.scss";
import { AddTableRowFormProps, ErrorFeedbackProps } from "@/types/types";
import { Balls } from "./Balls";

const tableDataSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  birthday_date: Yup.string().required("Birthday date is required"),
  phone_number: Yup.string()
    .required("Phone number is required")
    .max(20, "Phone number is too long"),
  address: Yup.string().required("Address is required"),
});

const AddTableRowForm: React.FC<AddTableRowFormProps> = ({
  action,
  selectedId,
}) => {
  const [postTableData, { isLoading, data, error }] =
    usePostTableDataMutation();
  const [patchTableData] = usePatchTableDataMutation();
  const [updateTableData] = useUpdateTableDataMutation();

  let buttonText = "";
  switch (action) {
    case "POST":
      buttonText = "Додати";
      break;
    case "PUT":
      buttonText = "Редагувати";
      break;
    case "PATCH":
      buttonText = "Оновити";
      break;
  }

  const ErrorFeedback: React.FC<ErrorFeedbackProps> = ({ name }) => {
    return (
      <ErrorMessage name={name}>
        {(errorMessage) => <span className={styles.error}>{errorMessage}</span>}
      </ErrorMessage>
    );
  };

  return (
    <>
      {isLoading && <Balls />}
      {error && <div>Error</div>}
      <div className={`${styles.container} ${styles.login__container__form}`}>
        <Formik
          initialValues={{
            name: "",
            email: "",
            birthday_date: "",
            phone_number: "",
            address: "",
          }}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            if (selectedId !== null) {
              switch (action) {
                case "POST":
                  postTableData(values);
                  break;
                case "PATCH":
                  patchTableData({ id: selectedId, data: values });
                  break;
                case "PUT":
                  updateTableData({ id: selectedId, data: values });
                  break;
                default:
                  console.error("Invalid action type");
              }
              resetForm();
            }
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
              {/*  */}
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
    </>
  );
};

export default AddTableRowForm;
