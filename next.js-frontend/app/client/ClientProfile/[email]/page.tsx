"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const page = ({ params }: { params: { email: string } }) => {
  const [client, setClient] = useState(null);
  const router = useRouter();
  console.log(params.email)
  useEffect(() => {
    console.log("Token:", localStorage.getItem('token'));
    console.log("Email from params:", params.email);
    console.log("Email from localStorage:", localStorage.getItem('email'));
    
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        console.log("Token:", token);
        
        
        if (token && email === decodeURIComponent(params.email)) {
          const response = await axios.get(`http://localhost:3000/clients/getClientByEmail/${email}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setClient(response.data);
        } else {
          router.push('/login');
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Opss....",
          text: error?.message,
        });
      }
    }
    fetchData();
  }, []);

  return (
    <div className=" my-5">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-md p-8">
        <form>
          <div className="flex justify-center mb-6">
            <img
              src={`http://localhost:3000/clients/getImage/${client?.profilePicture}`}
              className="w-32 h-32 rounded-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              defaultValue={client?.firstName}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-indigo-50 p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              defaultValue={client?.lastName}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-indigo-50 p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              defaultValue={client?.email}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-purple-50 p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              defaultValue={client?.userName}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-green-50 p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              defaultValue={client?.age}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-yellow-50 p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <input
              type="text"
              defaultValue={client?.status}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-yellow-50 p-2"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
