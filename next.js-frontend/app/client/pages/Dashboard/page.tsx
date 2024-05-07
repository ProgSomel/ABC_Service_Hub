"use client";
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import axios from 'axios'; 
import Link from "next/link";
import { MdOutlineDeleteOutline } from "react-icons/md";



const Dashboard = () => {
  const [clients, setClients] = useState<any|[]>([]);
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

  const handleGetClientById = async (e:any) => {
    e.preventDefault();
    const form = e.target;

    const id = parseInt(form.id.value);

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


  const handleClientDelete = async (id:any) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      });
  
      if (result.isConfirmed) {
        const response = await axios.delete(`http://localhost:3000/clients/${id}/deleteProfile`);
  
        Swal.fire({
          title: "Deleted!",
          text: "Client has been deleted.",
          icon: "success"
        });
  
        const remaining = clients.filter((client:any) => client?.id !== id);
        setClients(remaining);
        setSearchedClient(null)
      }
    } catch (err:any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err?.message
      });
    }
  };

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 md:px-2 lg:px-2">
      <form
        onSubmit={handleGetClientById}
        className="max-w-6xl mx-auto my-8 px-4 md:px-2 lg:px-2"
      >
        <input
          type="text"
          name="id"
          placeholder="Enter Client ID to Search"
          className="w-full border border-gray-300 rounded-md py-3 px-4 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring focus:ring-purple-500"
          
        />
        <div className="flex justify-center mt-5">
          <button
            className="btn bg-orange-400 hover:bg-orange-500 text-white font-bold"
            type="submit"
          >
            Get Client By ID
          </button>
        </div>
      </form>
      {
        searchedClient ? (
          <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead className="bg-green-600 text-white font-bold ">
      <tr>
        <th></th>
        <th>Image</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
     
     
          <tr>
        <th>
          
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={`http://localhost:3000/clients/getImage/${searchedClient?.profilePicture}`} />
              </div>
            </div>
           
          </div>
        </td>
        <td>
          {searchedClient?.firstName}
          <br/>
         
        </td>
        <td>{searchedClient?.lastName}</td>
        <td>{searchedClient?.email}</td>
        <th>
        <button className="btn bg-green-500 hover:bg-green-600  text-white font-bold">Update</button>
        </th>
        <th>
        <button onClick={()=>handleClientDelete(searchedClient?.id)} className="btn  bg-red-400 hover:bg-red-600 text-white font-bold">Delete</button>
          
        </th>
      </tr>
     
      
     
    </tbody>
    
    
  </table>
</div>
        ):
        (
          <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead className="bg-green-600 text-white font-bold ">
      <tr>
        <th></th>
        <th>Image</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
     
      {
        clients?.map((client:any)=> (
          <tr key={client?.id}>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={`http://localhost:3000/clients/getImage/${client?.profilePicture}`} />
              </div>
            </div>
           
          </div>
        </td>
        <td>
          {client?.firstName}
          <br/>
         
        </td>
        <td>{client?.lastName}</td>
        <td>{client?.email}</td>
        <th>
          <button className="btn bg-green-500 hover:bg-green-600  text-white font-bold">Update</button>
        </th>
        <th>
          <button onClick={()=>handleClientDelete(client?.id)} className="btn  bg-red-400 hover:bg-red-600 text-white font-bold">Delete</button>
        </th>
      </tr>
        ))
      }
     
    </tbody>
    
    
  </table>
</div>
        )
      }
    </div>
  );
};

export default Dashboard;
