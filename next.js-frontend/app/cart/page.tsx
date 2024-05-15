"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { getStoredItem, removeFromStorage } from "../utils/localStorage";
import { Quando } from "next/font/google";
import Swal from "sweetalert2";

const Page = () => {
  const [services, setServices] = useState([]);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const serviceCartIds = getStoredItem("cart");
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const [email, setEmail] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const tokenFromLocalStorage = localStorage.getItem("token");

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("token");
    setToken(tokenFromLocalStorage);
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000/services");
      setServices(response.data);
      setCartItems(
        response.data
          .filter((service: any) => serviceCartIds.includes(service?.serviceId))
          ?.map((item: any) => ({ ...item, quantity: 1 }))
      );
    };

    if (tokenFromLocalStorage) {
      // Check if token exists
      const emailFromLocal = localStorage.getItem("email");
      if (emailFromLocal) {
        const fetchUserData = async () => {
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

        fetchUserData();
      } else {
        console.log("Email is not available");
        setIsLoading(false); // Set isLoading to false if email is not available
      }
    } else {
      console.log("User is not logged in");
      setIsLoading(false); // Set isLoading to false if user is not logged in
    }
    fetchData();
  }, []);

  const totalPrice = cartItems.reduce(
    (total, item: any) => total + item.price * item.quantity,
    0
  );
  const totalQuantity = cartItems.reduce(
    (total, item: any) => total + item.quantity,
    0
  );

  const handleQuantityChange = (serviceId: any, newQuantity: any) => {
    const updatedServices = cartItems.map((item: any) =>
      item.serviceId === serviceId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedServices);
  };

  const handleClearItem = (cart: any, id: any) => {
    removeFromStorage(cart, id);
    const remainning = cartItems?.filter((item: any) => item.serviceId !== id);
    setCartItems(remainning);
    // window.location.reload();
  };

  const handleConfirmOrder = async (totalPrice: any) => {
    console.log(user);
    if (user && token) {
      try {
        const userData = {
          orderDate: new Date(),
          totalPrice: totalPrice,
          quantity: totalQuantity,
          status: "PENDING",
          paymentMethod: "CASH ON Delivery",
        };
        const response = await axios.post(
          `http://localhost:3000/clients/createOrder/${user?.id}`,
          userData
        );
        if (response.data) {
          localStorage.removeItem("cart");
          setCartItems([]);
          Swal.fire({
            title: "Good job!",
            text: "You have Successfully Confirmed the order",
            icon: "success",
          });
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You are not login. Please login and try again",
      });
    }
  };

  return (
    <div className="max-w-6xl min-h-screen mx-auto px-4 md:px-2 lg:px-2 my-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Your Cart
      </h1>
      <div className="bg-white shadow-md rounded overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Product</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Quantity</th>
              <th className="py-3 px-6 text-left">Total</th>
              <th>Delete Item</th>
            </tr>
          </thead>
          <tbody>
            {cartItems?.map((item: any) => (
              <tr
                key={item?.serviceId}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-4 px-6">{item?.service_name}</td>
                <td className="py-4 px-6">${item?.price}</td>
                <td className="py-4 px-6">
                  <input
                    type="number"
                    className="w-16 p-2 border rounded"
                    value={item?.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        item?.serviceId,
                        parseInt(e.target.value)
                      )
                    }
                    min="1"
                  />
                </td>
                <td className="py-4 px-6">${item?.price * item?.quantity}</td>
                <td
                  onClick={() => handleClearItem("cart", item?.serviceId)}
                  className="hover:scale-125 hover:cursor-pointer flex justify-center"
                >
                  X
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-4">
        <p className="text-lg font-bold">Total: ${totalPrice}</p>
      </div>
      <div className="flex justify-center mt-5">
        {cartItems.length > 0 && (
          <button
            onClick={() => handleConfirmOrder(totalPrice)}
            className="bg-orange-500 px-3 py-1 text-white font-bold rounded-md"
          >
            Book Service
          </button>
        )}
      </div>
    </div>
  );
};

export default Page;
