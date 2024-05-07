"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const NavBar = () => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);



  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("token");
    setToken(tokenFromLocalStorage);
  
    const emailFromLocal = localStorage.getItem("email");
  
    if (emailFromLocal) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/clients/getClientByEmail/${emailFromLocal}`, {
            headers: {
              Authorization: `Bearer ${tokenFromLocalStorage}`
            }
          });
          // Handle successful response here
          console.log(response.data);
          setUser(response.data)
        } catch (error) {
          // Handle error
          console.error("Error fetching client data:", error);
        }
      };
  
      fetchData();
    } else {
      // Handle the case when the user is not logged in or email is not available
      console.log("User is not logged in or email is not available");
    }
  }, []);
  

  const handleLogOut = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/clients/logout",
        null,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        setToken(null);
        console.log(response);
        if (response.data.message) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "User Logged In Successfully",
          });
          window.location.href = "/login";
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const navLinks = (
    <>
      <li>
        <Link className="font-bold" href="/">
          Home
        </Link>
      </li>
      <li>
        <Link className="font-bold" href="/about">
          About
        </Link>
      </li>
      
    </>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-2 lg:px-2">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <Link href="/">
            <h1>
              <span className="font-bold text-2xl text-[#FDA403]">ABC</span>{" "}
              <span className="italic text-sm text-[#76885B]">Service</span>
            </h1>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          {/* Avatar  */}
          {
            user && (
              <div className="avatar mr-5">
  <div className="w-12 rounded-full">
    <img className="" src={`http://localhost:3000/clients/getImage/${user?.profilePicture}`} />
  </div>
</div>
            )

          }
          {token ? (
            <button
              onClick={handleLogOut}
              className="btn bg-orange-400 hover:bg-orange-200 text-white font-bold"
            >
              Log Out
            </button>
          ) : (
            <Link href="/login">
              <button className="btn bg-orange-400 hover:bg-orange-200 text-white font-bold">
                Log In
              </button>
            </Link>
          )}

          
        </div>
      </div>
    </div>
  );
};

export default NavBar;
