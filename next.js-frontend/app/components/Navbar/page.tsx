"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaShoppingCart } from "react-icons/fa";
import { getStoredItem, removeFromStorage } from "@/app/utils/localStorage";
import { MdDelete } from "react-icons/md";

const NavBar = () => {
  const [token, setToken] = useState<string | null>(null);
  const [cart, setCart] = useState(0);
  const [user, setUser] = useState<any | null>(null);
  const [email, setEmail] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const serviceCartIds = getStoredItem("cart");

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("token");
    setToken(tokenFromLocalStorage);
    const cartFromLocalStorage = getStoredItem("cart");
    setCart(cartFromLocalStorage.length);

    const fetchCartData = async () => {
      const response = await axios.get("http://localhost:3000/services");
      setServices(response.data);
      setCartItems(
        response.data
          ?.filter((service: any) =>
            serviceCartIds.includes(service?.serviceId)
          )
          ?.map((item: any) => ({ ...item, quantity: 1 }))
      );
    };

    if (tokenFromLocalStorage) {
      // Check if token exists
      const emailFromLocal = localStorage.getItem("email");
      if (emailFromLocal) {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `http://localhost:3000/clients/getClientByEmail/${emailFromLocal}`,
              {
                headers: {
                  Authorization: `Bearer ${tokenFromLocalStorage}`,
                },
              }
            );
            setUser(response.data);
            setEmail(response.data.email);
            setIsLoading(false); // Set isLoading to false after user data is fetched
          } catch (error) {
            console.error("Error fetching client data:", error);
            setIsLoading(false); // Set isLoading to false in case of error
          }
        };

        fetchData();
      } else {
        console.log("Email is not available");
        setIsLoading(false); // Set isLoading to false if email is not available
      }
    } else {
      console.log("User is not logged in");
      setIsLoading(false); // Set isLoading to false if user is not logged in
    }
    fetchCartData();
  }, [cart, cartItems]);

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

  const handleGoToProfile = () => {
    window.location.href = `/client/ClientProfile/${email}`;
  };

  const handleClearItem = (cart: any, id: any) => {
    removeFromStorage(cart, id);
    const remainning = cartItems?.filter((item: any) => item.serviceId !== id);
    setCartItems(remainning);
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
      {isLoading ? (
        <p></p>
      ) : (
        // Render navbar once isLoading is false
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
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
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button
              className=""
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              {/* Cart  */}
              <div className="indicator mr-8">
                <span className="indicator-item badge  bg-yellow-200 w-1">
                  {cart}
                </span>
                <button className="w-8">
                  <FaShoppingCart />
                </button>
              </div>
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>

                <div>
                  {cartItems?.map((item) => (
                    <div className="hero  ">
                      <div className="my-2">
                        <div className="hero-content flex-col lg:flex-row">
                          <img
                            src={`http://localhost:3000/clients/getImage/${item?.serviceImg}`}
                            className="w-1/2"
                          />
                          <div>
                            <h1 className="text-xl font-bold">
                              {item?.service_name}
                            </h1>
                            <p>
                              <span className="py-4 text-yellow-500">
                                ${item?.price}
                              </span>
                              <span className="ml-3 font-light">
                                Quantity: {item?.quantity}
                              </span>
                            </p>

                            <p className="flex gap-4 items-center">
                              {item?.quantity}X{item?.price}
                              <span
                                onClick={() =>
                                  handleClearItem("cart", item?.serviceId)
                                }
                                className="hover:scale-125 hover:cursor-pointer"
                              >
                                <MdDelete />
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-center gap-5">
                    <Link href="/cart">
                      <button className="bg-yellow-500 text-white font-bold px-3 rounded-md">
                        View Cart
                      </button>
                    </Link>
                    <button className="bg-black text-white font-bold px-3 rounded-md">
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </dialog>

            {/* Avatar  */}
            {token && user && (
              <div
                onClick={handleGoToProfile}
                className="avatar mr-5 cursor-pointer "
              >
                <div className="w-12 rounded-full">
                  <img
                    className=""
                    src={`http://localhost:3000/clients/getImage/${user?.profilePicture}`}
                  />
                </div>
              </div>
            )}

            {token && user ? (
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
      )}
    </div>
  );
};

export default NavBar;
