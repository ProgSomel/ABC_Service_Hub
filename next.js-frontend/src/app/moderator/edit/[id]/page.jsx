"use client";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, useField, useFormikContext } from "formik";
import { signIn } from "next-auth/react";
import * as Yup from "yup";
import Link from "next/link";
import axios from "axios";

const schema = Yup.object({
  name: Yup.string()
    .required("Required")
    .matches(/^[a-zA-Z_ ]+$/, "Must be only letters"),
  email: Yup.string().email("Invalid email addresss").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Must be 8 characters or more")
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
  phone: Yup.string().required("Required"),
});

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div>
        <label
          htmlFor={props.id || props.name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <input
            className={
              meta.touched && meta?.error
                ? "block w-full rounded-md border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                : "block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            }
            {...field}
            {...props}
          />
          {meta.touched && meta.error ? (
            //red error icon
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          ) : null}
        </div>
        {meta.touched && meta.error ? (
          <p className="mt-2 text-sm text-red-600" id="email-error">
            {meta.error}
          </p>
        ) : null}
      </div>
    </>
  );
};

export default function Edit({ params }) {
  const [moderator, setmoderator] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:3000/moderator/" + params.id)
      .then((response) => {
        setmoderator(response.data);
      });
  }, [params.id]);
  const handleSubmit = async (values) => {
    // console.log(values);
    const result = await axios.patch(
      "http://localhost:3000/moderator/" + params.id,
      {
        name: values.name,
        userName: values.userName,
        email: values.email,
        password: values.password,
        phone: values.phone,
        age: values.age,
        address: values.address,
      }
    );
    console.log(result);
  };
  return (
    <>
      <div className="bg-gray-400 flex min-h-screen flex-col content-center justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="mb-6 sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Update Information
              </h2>
            </div>
            <Formik
              enableReinitialize
              initialValues={{
                name: moderator?.name,
                email: moderator?.email,
                password: moderator?.password,
                phone: moderator?.phone,
                age: moderator?.age,
                address: moderator?.address,
                userName: moderator?.userName,
              }}
              validationSchema={schema}
              onSubmit={handleSubmit}
            >
              <Form className="space-y-6">
                <TextInput
                  id="name"
                  label="Name"
                  name="name"
                  type="text"
                  required
                />
                <TextInput
                  id="userName"
                  label="Username"
                  name="userName"
                  type="text"
                  required
                />
                <TextInput
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  required
                />
                <TextInput
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  required
                />
                <TextInput
                  id="phone"
                  label="Phone"
                  name="phone"
                  type="text"
                  required
                />
                <TextInput
                  id="age"
                  label="Age"
                  name="age"
                  type="text"
                  required
                />
                <TextInput
                  id="address"
                  label="Address"
                  name="address"
                  type="text"
                  required
                />

                <div>
                  <button
                    type="submit"
                    className="my-3 group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Update
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
