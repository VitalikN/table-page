import * as Yup from "yup";

const today = new Date().toISOString().split("T")[0];

export const tableDataSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
    .min(2, "Name should have at least 2 characters")
    .max(50, "Name is too long")
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  birthday_date: Yup.date()
    .max(today, "Birthday date cannot be in the future")
    .required("Birthday date is required")
    .typeError("Invalid date format"),
  phone_number: Yup.string()
    .required("Phone number is required")
    .min(13, "Phone number is too short")
    .max(13, "Phone number is too long")
    .matches(
      /^(\+380)[0-9]{9}$/,
      "Only Ukrainian mobile numbers +380 are allowed"
    ),
  address: Yup.string()
    .max(150, "Address is too long")
    .required("Address is required"),
});

export const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Логін повинен мати щонайменше 4 символи!")
    .required("Обов'язкове поле!"),
  password: Yup.string()
    .min(6, "Пароль повинен мати щонайменше 6 символів!")
    .required("Обов'язкове поле!"),
});
