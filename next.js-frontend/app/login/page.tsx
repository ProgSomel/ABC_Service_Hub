"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if(!email) {
      toast.error("Email field can not be Empty")
      return
    }
    if(!password) {
      toast.error("password  field can not be Empty ")
      return
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/clientAuth/clientLogin",
        { email, password }, // Send data as JSON object
        {
          headers: {
            "Content-Type": "application/json", // Set content type to application/json
          },
        }
      );
      
      const token = response.data;
      localStorage.setItem("token", token.access_token);
      localStorage.setItem("email", email);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "User Logged In Successfully",
      });
      // router.push(`/client/ClientProfile/${email}`)
      // router.push("/");
      window.location.href = "/";

      // window.location.reload();
    } catch (err: any) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops....",
        text: err,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-center items-stretch bg-gray-100 py-8 px-4 lg:px-0">
      {/* Left Div with Image */}
      <div className="lg:flex justify-center items-center relative w-full lg:w-1/2">
        <img src="" alt="Registration" className="object-cover h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 opacity-75"></div>
      </div>

      {/* Right Div with Form */}
      <div className=" bg-white p-8 rounded shadow-md w-full max-w-md  lg:mr-0 lg:w-1/2 flex flex-col justify-between">
        <h2 className="text-3xl mb-6 text-center font-semibold text-gray-800">
          Sign In
        </h2>
        <form
          onSubmit={handleLogin}
          className="flex flex-col justify-between flex-grow"
        >
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-800">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md py-3 px-4 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-800">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-md py-3 px-4 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring focus:ring-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 transition duration-300"
          >
            Sign In
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-4">
          <span className="text-gray-800">Don't have an account yet?</span>{" "}
          <Link href="/register">
            <button className="text-purple-600 hover:underline focus:outline-none">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
