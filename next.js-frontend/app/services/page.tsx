"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const Services = () => {
  const [services, setServices] = useState([]);
  const [viewAll, setViewAll] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/services");
        console.log(response.data);
        setServices(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 md:px-2 lg:px-2 my-12">
        <div className="flex items-center justify-between mb-5">
            <h1 className="text-3xl font-bold ">For Home</h1>
            <button onClick={()=> setViewAll(!viewAll)} className="text-xl font-bold text-orange-400 mb-5">{viewAll ? "View Less": "view All"} <span className="text-3xl "> {'>'}</span> </button>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {viewAll ?
        (services?.map((service:any) => (

          <div className="card card-compact  bg-base-100 shadow-xl">
            <figure>
              <img
                 src={`http://localhost:3000/clients/getImage/${service?.serviceImg}`}
                alt="serviceImg"
              />
            </figure>
            <div className="card-body">
              <div className="flex items-center gap-5">
              <h2 className="card-title">{service?.service_name}</h2>
              <p className=" text-orange-600 font-bold">{service?.rating}</p>
              </div>
              <p>{service?.service_description}</p>
              <div className="flex items-center justify-between gap-5 mt-5">
                <div className="flex items-center justify-between gap-5">
                    <p className=" btn-xs py-1 rounded-lg font-bold text-orange-500">${service?.price}</p>
                   
                </div>
                <button className="btn btn-outline border-orange-400 hover:bg-orange-500 hover:border-none">Add to Cart</button>
              </div>
            </div>
          </div>
        ))):

        (services?.slice(0,4).map((service:any) => (

            <div className="card card-compact  bg-base-100 shadow-xl">
              <figure>
                <img
                   src={`http://localhost:3000/clients/getImage/${service?.serviceImg}`}
                  alt="serviceImg"
                />
              </figure>
              <div className="card-body">
                <div className="flex items-center gap-5">
                <h2 className="card-title">{service?.service_name}</h2>
                <p className=" text-orange-600 font-bold">{service?.rating}</p>
                </div>
                <p>{service?.service_description}</p>
                <div className="flex items-center justify-between gap-5 mt-5">
                  <div className="flex items-center justify-between gap-5">
                      <p className=" btn-xs py-1 rounded-lg font-bold text-orange-500">${service?.price}</p>
                     
                  </div>
                  <button className="btn btn-outline border-orange-400 hover:bg-orange-500 hover:border-none">Add to Cart</button>
                </div>
              </div>
            </div>
          )))

        }
      </div>
    </div>
  );
};

export default Services;
