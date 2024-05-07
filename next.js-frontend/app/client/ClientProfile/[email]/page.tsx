"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const Page = ({ params }: { params: { email: string } }) => {
  const [client, setClient] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        
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
      } catch (error:any) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error?.message,
        });
      }
    }
    fetchData();
  }, []);

  const handleUpdateClientProfile = async (e:any) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');
      
      if (!token || email !== decodeURIComponent(params.email)) {
        router.push('/login');
        return;
      }

      const response = await axios.patch(
        `http://localhost:3000/clients/${client?.id}/updateProfile`,
        {
          firstName: e.target.elements.firstName.value,
          lastName: e.target.elements.lastName.value,
          email: e.target.elements.email.value,
          userName: e.target.elements.userName.value,
          age: e.target.elements.age.value,
          status: e.target.elements.status.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Profile updated successfully!",
      });

      // Optionally, you can update the client state with the updated data if needed
      setClient(response.data);
    } catch (error:any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  return (
    <div className=" my-5">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-md p-8">
        <form onSubmit={handleUpdateClientProfile}>
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
              name="firstName"
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
              name="lastName"
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
              name="email"
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
              name="userName"
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
              name="age"
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
              name="status"
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

export default Page;
