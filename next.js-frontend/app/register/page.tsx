"use client";

import axios from "axios";
import Link from "next/link";
import React from "react";
import Swal from 'sweetalert2'

const Register = () => {
  

  const handleRegistration = async(e:any) => {
    e.preventDefault();
    try {
      const form = e.target
      

      const firstName = form.firstName.value;

      const lastName = form.lastName.value;

      const email = form.email.value;

      const userName = form.userName.value;

      const password = form.password.value;

      const confirmPassword = form.confirmPassword.value;

      
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("userName", userName);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);

      const response = await axios.post('http://localhost:3000/clients/clientRegistration', formData, {
         headers: {
           'Content-Type': 'multipart/form-data'
           }
        
      })
      if(response.statusText === "Created") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "User Registered Successfully",
          
        });
        form.reset();

      }

    } catch(err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="min-h-screen flex flex-col lg:flex-row justify-center items-stretch bg-gray-100 py-8 px-4 lg:px-0">
        {/* Left Div with Image */}
        <div className="lg:flex justify-center items-center relative w-full lg:w-1/2">
          <img
            src=""
            alt="Registration"
            className="object-cover h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 opacity-75"></div>
        </div>

        {/* Right Div with Form */}
        <div className=" bg-white p-8 rounded shadow-md w-full max-w-md  lg:mr-0 lg:w-1/2 flex flex-col justify-between">
          <h2 className="text-3xl mb-6 text-center font-semibold text-gray-800">
            Sign Up
          </h2>
          <form
            onSubmit={handleRegistration}
            className="flex flex-col justify-between flex-grow"
          >
            <div className="flex flex-wrap -mx-4 mb-4">
              {/* First Name */}
              <div className="w-full lg:w-1/2 px-2 mb-4 lg:mb-0">
                <label className="block mb-1 font-medium text-gray-800">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  className="w-full border border-gray-300 rounded-md py-3 px-4 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring focus:ring-purple-500"
                  required
                />
              </div>

              {/* Last Name */}
              <div className="w-full lg:w-1/2 px-2">
                <label className="block mb-1 font-medium text-gray-800">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  className="w-full border border-gray-300 rounded-md py-3 px-4 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="my-4">
              <label className="block mb-1 font-medium text-gray-800">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-md py-3 px-4 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring focus:ring-purple-500"
                required
              />
            </div>

            {/* Username */}
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-800">
                User Name
              </label>
              <input
                type="text"
                name="userName"
                placeholder="Enter your username"
                className="w-full border border-gray-300 rounded-md py-3 px-4 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring focus:ring-purple-500"
                required
              />
            </div>

            {/* Profile Image
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-800">
                Profile Image
              </label>
              <input
                type="file"
                name="profileImage"
                accept="image/*"
                className="w-full border border-gray-300 rounded-md py-3 px-4 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring focus:ring-purple-500"
              />
            </div> */}

            {/* Address */}
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-800">
                Address
              </label>
              <textarea
                name="address"
                placeholder="Enter your address"
                className="w-full border border-gray-300 rounded-md py-3 px-4 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring focus:ring-purple-500"
                required
              ></textarea>
            </div>

            {/* file  */}
            <div className="my-5">
              <input type="file" name="profilePicture" />
            </div>

            <div className="flex flex-wrap -mx-4 mb-4">
              {/* Password */}
              <div className="w-full lg:w-1/2 px-2 mb-4 lg:mb-0">
                <label className="block mb-1 font-medium text-gray-800">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-md py-3 px-4 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring focus:ring-purple-500"
                  required
                />
              </div>

              {/* Repeat Password */}
              <div className="w-full lg:w-1/2 px-2">
                <label className="block mb-1 font-medium text-gray-800">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  className="w-full border border-gray-300 rounded-md py-3 px-4 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="mb-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" required />
                <span className="text-gray-800">
                  I agree to the Terms and Conditions
                </span>
              </label>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 transition duration-300"
            >
              Sign Up
            </button>
          </form>
          {/* Sign In Link */}
          <div className="text-center mt-4">
            <span className="text-gray-800">Already have an account?</span>{" "}
            <Link href="/login">
              <p className="text-purple-600 hover:underline">Sign In</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
