"use client";

import { useAuth } from "@/hooks/authHooks";
import { ErrorMessage, Field, Form, Formik } from "formik";

import styles from "../sass/layouts/login.module.scss";
import * as Yup from "yup";
import { ErrorFeedbackProps } from "../types/types";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Логін повинен мати щонайменше 4 символи!")
    .required("Обов'язкове поле!"),
  password: Yup.string()
    .min(6, "Пароль повинен мати щонайменше 6 символів!")
    .required("Обов'язкове поле!"),
});
const Login: React.FC = () => {
  const { login, isLoading, isError, error } = useAuth();

  const handleLogin = (username: string, password: string) => {
    console.log("handleLogin called with:", username, password);
    if (username && password) {
      login({ username, password });
    }
  };

  const ErrorFeedback: React.FC<ErrorFeedbackProps> = ({ name }) => {
    return (
      <ErrorMessage name={name}>
        {(errorMessage) => <span className={styles.error}>{errorMessage}</span>}
      </ErrorMessage>
    );
  };

  return (
    <section className={styles.section__login}>
      <div className={`${styles.container} ${styles.login__container__form}`}>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={(values, { resetForm }) => {
            handleLogin(values.username, values.password);
            console.log(values);

            resetForm();
          }}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
            <Form className={styles.form}>
              <div className={styles.form__box}>
                <label className={styles.label}>
                  Ім`я:
                  <Field
                    className={styles.input}
                    type="text"
                    name="username"
                    error={touched.username && errors.username}
                  />
                </label>
                <ErrorFeedback name="username" />
              </div>
              <div className={styles.form__box}>
                <label className={styles.label}>
                  Пароль:
                  <Field
                    className={styles.input}
                    type="password"
                    name="password"
                    error={touched.password && errors.password}
                  />
                </label>

                <ErrorFeedback name="password" />
              </div>

              <button className={styles.styledBtn} type="submit">
                Надіслати
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};
export default Login;
