"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getStoredItem, removeFromStorage } from '../utils/localStorage';
import { Quando } from 'next/font/google';

const Page = () => {

    const [services, setServices] = useState([]);
    const [cartItems, setCartItems] = useState<any[]>([]);
    const serviceCartIds = getStoredItem('cart');


    useEffect(()=> {
        const fetchData = async() => {
            const response = await axios.get("http://localhost:3000/services")
            setServices(response.data);
            setCartItems(response.data.filter((service:any) => serviceCartIds.includes(service?.serviceId))
            ?.map((item:any)=> ({...item, quantity: 1}))
        )
        }
        fetchData();
    }, [])



    
   

    
      const totalPrice = cartItems.reduce(
        (total, item:any) => total + item.price * item.quantity,
        0
      );

    const handleQuantityChange = (serviceId:any, newQuantity:any) => {
        const updatedServices = cartItems.map((item:any) =>
          item.serviceId === serviceId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedServices);
      };


      const handleClearItem = (cart:any, id:any) => {
        removeFromStorage(cart, id);
        const remainning = cartItems?.filter((item:any) => item.serviceId !== id);
        setCartItems(remainning);
        // window.location.reload();
      }

  
 
    return (
        <div className="max-w-6xl mx-auto px-4 md:px-2 lg:px-2 my-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Your Cart</h1>
      <div className="bg-white shadow-md rounded overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Product</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Quantity</th>
              <th className="py-3 px-6 text-left">Total</th>
              <th>Delete Item</th>
            </tr>
          </thead>
          <tbody>
            {cartItems?.map((item:any) => (
              <tr key={item?.serviceId}  className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-4 px-6">{item?.service_name}</td>
                <td className="py-4 px-6">${item?.price}</td>
                <td className="py-4 px-6">
                  <input
                    type="number"
                    className="w-16 p-2 border rounded"
                    value={item?.quantity}
                    onChange={(e)=>handleQuantityChange(item?.serviceId, parseInt(e.target.value))}
                    min="1"
                  />
                </td>
                <td className="py-4 px-6">${item?.price*item?.quantity}</td>
                <td onClick={()=>handleClearItem("cart", item?.serviceId)} className='hover:scale-125 hover:cursor-pointer flex justify-center'>X</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-4">
        <p className="text-lg font-bold">Total: ${totalPrice}</p>
      </div>
    </div>
    );
}

export default Page;
