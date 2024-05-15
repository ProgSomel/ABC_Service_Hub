"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Edit({ params }) {
  const [moderator, setmoderator] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:3000/moderator/" + params.id)
      .then((response) => {
        setmoderator(response.data);
      });
  }, [params.id]);

  useEffect(() => {
    const session = sessionStorage.getItem("token");
    if (!session) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      {moderator && (
        <div className="h-full bg-gray-400">
          <div className="h-full">
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
               
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  User Details
                </h2>
              </div>

              <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                  <form className="space-y-6" action="#" method="POST">
                    <div>
                      <label
                        htmlFor="Name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <div className="mt-1">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          defaultValue={moderator.name}
                          autoComplete="name"
                          disabled
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="userName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Username
                      </label>
                      <div className="mt-1">
                        <input
                          id="userName"
                          name="userName"
                          type="text"
                          value={moderator.userName}
                          autoComplete="userName"
                          disabled
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={moderator.email}
                          autoComplete="email"
                          disabled
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone
                      </label>
                      <div className="mt-1">
                        <input
                          id="phone"
                          name="phone"
                          type="text"
                          value={moderator.phone}
                          autoComplete="phone"
                          disabled
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="age"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Age
                      </label>
                      <div className="mt-1">
                        <input
                          id="age"
                          name="age"
                          type="text"
                          value={moderator.age}
                          autoComplete="age"
                          disabled
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="adress"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address
                      </label>
                      <div className="mt-1">
                        <input
                          id="address"
                          name="address"
                          type="text"
                          value={moderator.address}
                          autoComplete="address"
                          disabled
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
