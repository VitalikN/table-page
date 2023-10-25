"use client";

import { useAuth } from "@/hooks/authHooks";
import { ErrorMessage, Field, Form, Formik } from "formik";

import styles from "../sass/layouts/login.module.scss";
import { ErrorFeedbackProps } from "../types/types";
import { validationSchema } from "../validationSchemas";

const Login: React.FC = () => {
  const { login, isLoading, isError, error } = useAuth();

  const handleLogin = (username: string, password: string) => {
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

            resetForm();
          }}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
            <Form className={styles.form}>
              <div className={styles.form__box}>
                <label className={styles.label}>
                  Name:
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
                  Password:
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
                Sign in
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};
export default Login;
