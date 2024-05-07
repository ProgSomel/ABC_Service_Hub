"use client";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import axios from "axios";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import  { useState } from "react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleRegistration = async (e: any) => {
    e.preventDefault();
    
    try {
      const form = e.target;

    const firstName = form.firstName.value;

    const lastName = form.lastName.value;

    const email = form.email.value;

    const userName = form.userName.value;

    const password = form.password.value;

    

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("userName", userName);
    formData.append("password", password);
    

    // Get the file input element
    const profilePictureInput = form.querySelector(
      'input[name="profilePicture"]'
    );
    // Check if a file is selected
    if (profilePictureInput && profilePictureInput.files.length > 0) {
      const profilePicture = profilePictureInput.files[0];
      formData.append("profilePicture", profilePicture);
    }

    if (!firstName) {
      toast.error("First Name field can not be Empty");
      return;
    }
    if (!lastName) {
      toast.error("Last Name field can not be Empty");
      return;
    }
    if (!email) {
      toast.error("Email field can not be Empty");
      return;
    }
    if (!userName) {
      toast.error("User Name field can not be Empty");
      return;
    }
    if (!password) {
      toast.error("Password field can not be Empty");
      return;
    }
    if(!/[A-Z]/.test(password)) {
      toast.error("Password Must have at least one Uppercase letter");
      return;
  }
  else if(!/[a-z]/.test(password)) {
      toast.error("Password Must have at least one lowercase letter");
      return;
  }
  else if(password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
  }
   
    
      const response = await axios.post(
        "http://localhost:3000/clientAuth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      if (response.statusText === "Created") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "User Registered Successfully",
        });
        window.location.href = "/login";
        form.reset();
      }
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Opss....",
        text: err.message,
      });
    }
  };
  return (
    <div>
      <div className="min-h-screen flex flex-col md:flex-row justify-center items-stretch overflow-hidden bg-gray-100 py-8 px-4 lg:px-0 ">
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
              ></textarea>
            </div>

            {/* file  */}
            <div className="my-5">
              <input type="file" name="profilePicture" />
            </div>

            <div className=" w-full  mb-4 ">
              {/* Password */}
              <div className="mb-4 relative">
              <label className="block mb-1 font-medium text-gray-800">
                  Password
                </label>
              <input
                  type={showPassword ? "text": "password"}
                  name="password"
                  placeholder=" Enter your password"
                  className="w-full border border-gray-300 rounded-md py-3 px-4 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring focus:ring-purple-500"
                />
            <span className="absolute top-11 right-2" onClick={()=>setShowPassword(!showPassword)}>
              {
                showPassword ? <FaEye className="cursor-pointer"></FaEye>:<FaEyeSlash className="cursor-pointer"></FaEyeSlash>
              }
            </span>
          </div>

             
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
