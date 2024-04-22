"use client";
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import axios from 'axios'; 


const Dashboard = () => {
  const [clients, setClients] = useState([]);
  const [searchedClient, setSearchedClient] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/clients");
        setClients(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleGetClientById = async (e) => {
    e.preventDefault();
    const form = e.target;

    const id = parseInt(form.id.value);
    console.log(typeof id);

    try {
      const response = await axios.get(`http://localhost:3000/clients/${id}`);
      if (response.data) {
        const searchedClient = clients.find((client:any) => client.id == id);
        setSearchedClient(searchedClient);
        form.reset();
      }
    } catch (error:any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Id ${id} is not found!`,
        
      });
    }
  };


  const handleClientDelete = async(id:any) => {
    console.log(id);
    try {
      const response = await axios.delete(`http://localhost:3000/clients/${id}/deleteProfile`)
      
      console.log(response.data)

      Swal.fire({
        position: "center",
        icon: "success",
        title: `id ${id} is deleted Successfully`,
        showConfirmButton: false,
        timer: 1500
      });

      const remaining = clients.filter((client:any) => client.id!== id)
      setClients(remaining)
    }
    catch(err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
        
      });

    }
  };

  return (
    <div>
      <form
        onSubmit={handleGetClientById}
        className="max-w-6xl mx-auto my-12 px-4 md:px-2 lg:px-2"
      >
        <input
          type="text"
          name="id"
          placeholder="Enter Client ID to Search"
          className="w-full border border-gray-300 rounded-md py-3 px-4 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring focus:ring-purple-500"
          required
        />
        <div className="flex justify-center mt-5">
          <button
            className="btn bg-orange-400 text-white font-bold"
            type="submit"
          >
            Get Client By ID
          </button>
        </div>
      </form>
      <div className=" grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-5 max-w-6xl mx-auto my-12 px-4 md:px-2 lg:px-2">
      {searchedClient ? (
          <div className="card  bg-neutral text-neutral-content">
          <div className="card-body items-center text-center">
            <h2 className="card-title">
              {searchedClient?.firstName} {searchedClient?.lastName}
            </h2>
            <p className="font-bold text-2xl">{searchedClient?.email}</p>
            <div className="card-actions w-full  mt-5">
              <button
                onClick={() => handleClientDelete(searchedClient?.id)}
                className="btn bg-blue-300 btn-primary w-full  text-white"
              >
                Delete Client
              </button>
            </div>
          </div>
        </div>
        ) : (
          clients.map((client) => (
            <div className="card  bg-neutral text-neutral-content">
            <div className="card-body items-center text-center">
              <h2 className="card-title">
                {client?.firstName} {client?.lastName}
              </h2>
              <p className="font-bold text-2xl">{client?.email}</p>
              <div className="card-actions w-full  mt-5">
                <button
                  onClick={() => handleClientDelete(client?.id)}
                  className="btn bg-blue-300 btn-primary w-full  text-white"
                >
                  Delete Client
                </button>
              </div>
            </div>
          </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
