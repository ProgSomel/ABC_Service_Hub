"use client";
import Link from "next/link";
import React from "react";
import axios from "axios";


const Login = () => {

  const handleLogin = async(e:any) => {
    e.preventDefault();
    try {
      const form = e.target;
    const email = form.email.value
    const password = form.password.value

    const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

    const response = await axios.post("http://localhost:3000/clients/clientLogin", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
        }
    })
    console.log(response)

    }
    catch(error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-center items-stretch bg-gray-100 py-8 px-4 lg:px-0">
    {/* Left Div with Image */}
    <div className="lg:flex justify-center items-center relative w-full lg:w-1/2">
      <img src="{registrationImag}" alt="Registration" className="object-cover h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 opacity-75"></div>
    </div>

    {/* Right Div with Form */}

    <div className=" bg-white p-8 rounded shadow-md w-full max-w-md  lg:mr-0 lg:w-1/2 flex flex-col justify-between">
      <h2 className="text-3xl mb-6 text-center font-semibold text-gray-800">Sign In</h2>
      <form onSubmit={handleLogin} className="flex flex-col justify-between flex-grow">

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-800">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-md py-3 px-4 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring focus:ring-purple-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-800">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-md py-3 px-4 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring focus:ring-purple-500"
            required
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
        <span className="text-gray-800">Don't have an account yet?</span>{' '}
        <Link href="/register">
        <button className="text-purple-600 hover:underline focus:outline-none">Sign Up</button>
        </Link>
      </div>
    </div>
  </div>
  );
};

export default Login;
