import Link from "next/link";
import React from "react";

const ClientNavBar = () => {
  return (
    <div>
      <div className="border-b border-gray-200 py-6 max-w-screen-lg mx-auto px-4 md:px-4 lg:px-8">
        <div className="container sm:flex justify-between items-center">
          <div>
            <Link href="/">
              <h1>
                <span className="font-bold text-2xl text-[#FDA403]">Client</span>{" "}
                <span className="italic text-sm text-[#76885B]">Page</span>
              </h1>
            </Link>
          </div>
          <div className="flex justify-between md:gap-8 flex-col md:flex-row">
            <Link className="font-bold" href="/">
              Home
            </Link>
            <Link className="font-bold" href="/allServices">
              All Services
            </Link>
            <Link className="font-bold" href="/about">
              My Added Service
            </Link>
            <Link className="font-bold" href="/login">
              Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientNavBar;
