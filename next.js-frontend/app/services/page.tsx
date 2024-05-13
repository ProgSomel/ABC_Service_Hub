"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Fade, Slide } from "react-awesome-reveal";

const Services = () => {
  const [services, setServices] = useState([]);
  const [viewAll, setViewAll] = useState(false);

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
      <div className=" mb-8 ">
        <Slide>
          <h1 className="italic font-mono text-orange-500">Perfect for you</h1>
        </Slide>
        <Slide>
          <h1 className="text-6xl font-bold  text-left font-mono italic my-2">
            Our Services
          </h1>
        </Slide>

        <Slide>
          <p className="font-light max-w-4xl">
            we are committed to providing top-notch home services tailored to
            meet your needs. Our experienced team of professionals offers a
            comprehensive range of services including plumbing, electrical work,
            carpentry, painting, and more.
          </p>
        </Slide>
      </div>

      <div className="grid hover:cursor-pointer  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {viewAll
          ? services?.map((service: any) => (
             <Link href="/services/pages/serviceDetails">
               <div
                data-aos="fade-up"
                data-aos-duration="3000"
                className="card hover:border-2 hover:border-orange-400  hover:scale-110 card-compact  bg-base-100 shadow-xl"
              >
                <figure>
                  <img
                    className=" "
                    src={`http://localhost:3000/clients/getImage/${service?.serviceImg}`}
                    alt="serviceImg"
                  />
                </figure>
                <div className="card-body ">
                  <div className="flex items-center gap-5">
                    <h2 className="card-title">{service?.service_name}</h2>
                    <p className=" text-orange-600 font-bold">
                      {service?.rating}
                    </p>
                  </div>
                  <p>{service?.service_description}</p>
                  <div className="flex items-center justify-between gap-5 mt-5">
                    <div className="flex items-center justify-between gap-5">
                      <p className=" btn-xs py-1 rounded-lg font-bold text-orange-500">
                        ${service?.price}
                      </p>
                    </div>
                    <button className="btn btn-outline border-orange-400 hover:bg-orange-500 hover:border-none hover:scale-110">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
             </Link>
            ))
          : services?.slice(0, 8).map((service: any) => (
             <Link href="/services/pages/serviceDetails">
               <div
                data-aos="fade-up"
                data-aos-duration="3000"
                className="card hover:border-2 hover:border-orange-400 hover:cursor-pointer  hover:scale-110 card-compact  bg-base-100 shadow-xl"
              >
                <figure>
                  <img
                    src={`http://localhost:3000/clients/getImage/${service?.serviceImg}`}
                    alt="serviceImg"
                  />
                </figure>
                <div className="card-body ">
                  <div className="flex items-center gap-5">
                    <h2 className="card-title">{service?.service_name}</h2>
                    <p className=" text-orange-600 font-bold">
                      {service?.rating}
                    </p>
                  </div>
                  <p>{service?.service_description}</p>
                  <div className="flex items-center justify-between gap-5 mt-5">
                    <div className="flex items-center justify-between gap-5">
                      <p className=" btn-xs py-1 rounded-lg font-bold text-orange-500">
                        ${service?.price}
                      </p>
                    </div>
                    <button className="btn btn-outline border-orange-400 hover:bg-orange-500 hover:border-none hover:scale-110">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
             </Link>
            ))}
      </div>

      <Slide>
        <div className="flex justify-center mt-12 ">
          <button
            onClick={() => setViewAll(!viewAll)}
            className="text-xl font-bold text-orange-400 hover:scale-125 btn btn-outline hover:bg-orange-500 hover:border-none"
          >
            {viewAll ? "View Less" : "view All"}{" "}
            <span className="text-3xl "></span>{" "}
          </button>
        </div>
      </Slide>
    </div>
  );
};

export default Services;
