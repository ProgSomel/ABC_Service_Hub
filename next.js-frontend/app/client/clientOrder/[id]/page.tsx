"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const Page = ({ params }: { params: { id: number } }) => {
  const [orders, setOrders] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        
        if (token && email) {
          const response = await axios.get(`http://localhost:3000/clients/getOrders/${params?.id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setOrders(response.data);
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

//   const handleUpdateClientProfile = async (e:any) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       const email = localStorage.getItem('email');
      
//       if (!token || email !== decodeURIComponent(params.email)) {
//         router.push('/login');
//         return;
//       }

//       const response = await axios.patch(
//         `http://localhost:3000/clients/${client?.id}/updateProfile`,
//         {
//           firstName: e.target.elements.firstName.value,
//           lastName: e.target.elements.lastName.value,
//           email: e.target.elements.email.value,
//           userName: e.target.elements.userName.value,
//           age: e.target.elements.age.value,
//           status: e.target.elements.status.value,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: "Profile updated successfully!",
//       });

      
//       setClient(response.data);
//     } catch (error:any) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: error.message,
//       });
//     }
//   };

  return (
    <div className="min-h-screen">
        <div className="max-w-6xl mx-auto px-4 md:px-2 lg:px-2 my-12">
            <h1 className="text-center text-3xl font-bold">Your Orders</h1>
  <table className="table mt-8">
    {/* head */}
    <thead>
      <tr className="bg-green-500 text-white font-bold">
        <th></th>
        <th>Booking Date</th>
        <th>Service Booked</th>
        <th>Total Amount</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      
      {
        orders?.map((order:any, idx=1)=> <tr>
        <th>{++idx}</th>
        <td>{order?.orderDate}</td>
        <td>{order?.quantity}</td>
        <td>{order?.totalPrice}</td>
        <td>{order?.status}</td>
      </tr>)
      }
      
     
     
    </tbody>
  </table>
</div>
    </div>
  );
};

export default Page;
