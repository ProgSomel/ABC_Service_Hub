"use client";
import Banner from "./Pages/Home/Banner/page";
import Services from "./services/page";
import menLogo from "../public/images/men.png";


import { FaPhone } from "react-icons/fa";

import { Fade, Slide } from "react-awesome-reveal";
// Import Swiper styles
import 'swiper/css/navigation';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/free-mode';
import { FreeMode} from 'swiper/modules';
import { Pagination } from "swiper/modules";



//* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { CiStar } from "react-icons/ci";

export default function Home() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("reviews.json")
      .then((response) => response.json())
      .then((data) => setReviews(data));
  }, []);
  return (
    <div>
      <Banner></Banner>
      <Services></Services>

     

     {/* Sunscribe Section  */}
     <div className="mt-5">
        <div
          className="relative min-h-screen bg-cover bg-center bg-no-repeat w-full py-12 lg:pt-28"
          style={{
            backgroundImage: `url("https://i.postimg.cc/Qd4rmKGt/call-Image.jpg")`,
            backgroundSize: "cover",
          }}
        >
          <div data-aos="fade-down ">
            <div className="text-white text-center p-4  md:p-0">
              <Slide>
                <h1 className="text-2xl md:text-5xl lg:text-7xl font-extrabold md:mb-8 text-orange-500 ">
                  <span className="text-white ">
                    Get 20% OFF Your <br /> First 
                  </span>
                  Order!{" "}
                </h1>
              </Slide>

              <Slide>
                <p className="mb-6 md:mb-12 font-bold lg:text-xl w-full  lg:w-1/2 lg:mx-auto">
                  Don’t Wanna Miss Somethings? Subscribe Right Now & Get The
                  Special Discount & Monthly Newsletter.
                </p>
              </Slide>

              <Slide>
                <div className="join md:w-2/4">
                  <input
                    className="input input-bordered join-item w-full"
                    placeholder="Your email address"
                  />
                  <button className="btn join-item bg-orange-500 hover:bg-orange-600  text-white border-none font-bold">
                    Subscribe
                  </button>
                </div>
              </Slide>
            </div>
          </div>
        </div>
      </div>

       {/* Reviews By Clients  */}
       <div className="my-12">
        <div
          className="relative bg-cover bg-center bg-no-repeat w-full "
          style={{
            backgroundImage: `url("https://i.postimg.cc/bJcDYwYz/review.jpg")`,
            backgroundSize: "cover",
          }}
        >
          <div data-aos="fade-down ">
            <div className="text-white min-h-screen max-w-6xl mx-auto px-5 md:px-2 py-8   md:py-20">
             <Slide>
             <h1 className="text-3xl md:w-4/5 md:text-6xl  font-extrabold md:mb-8 text-white ">
                What Our Client Say About Us
              </h1>
             </Slide>

              <Slide>
              <p className="mb-6 w-3/4 md:mb-12 font-light lg:text-xl ">
                Discover what sets us apart from the rest through the words of
                our valued clients. At Turio, we prioritize customer
                satisfaction above all else.
              </p>
              </Slide>

              {/* review Card  */}
              <div data-aos="flip-left">
                <div className="">
                  
                  <div>
                    <Swiper
                      slidesPerView={2}
                      spaceBetween={30}
                      pagination={{
                        clickable: true,
                      }}
                      modules={[Pagination]}
                      className="w-full max-w-6xl h-[800px] md:h-[400px] lg:h-[350px] mx-auto "
                    >
                      {reviews.map((review:any, idx) => (
                        <SwiperSlide className="" key={idx}>
                          <div className="">
                            <div className="bg-[#00224D] h-full  text-neutral-content flex justify-center hover:bg-white  hover:text-black hover:cursor-pointer">
                              <div className="card-body  text-gray-400  mt-5   text-center">
                                <p className="flex justify-center items-center text-red-400">
                                  {review?.rating}{" "}
                                  <span className="text-orange-700 ">
                                    <CiStar />
                                  </span>{" "}
                                </p>

                                <Fade  cascade damping={1e-1}>
                                <p className=" md:text-2xl hover:text-black">{review?.review}</p>
                                </Fade>
                                <Slide direction="up">
                                <div className="flex flex-col md:flex-row items-center gap-5 mt-5">
                                  <img
                                    className="w-[70px]"
                                    src={menLogo}
                                    alt=""
                                  />
                                  <div>
                                    <p className="text-2xl font-bold">
                                      {review.name}
                                    </p>
                                    <p>{review.occupation}</p>
                                  </div>
                                </div>
                                </Slide>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
