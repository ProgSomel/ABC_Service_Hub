"use client";

import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const contactUs = () => {
  const [recipient, setRecipient] = useState('somelahmed55@gmail.com');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
   if(recipient || subject || text) {
    try {
      const response = await axios.post('http://localhost:3000/clients/emailSending', {
        recipient,
        subject,
        text,
      });
      console.log(response);
      Swal.fire({
        icon: 'success',
        title: 'Email Sent Successfully',
        text: `Recipient: ${recipient}`,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to send email. Please try again later.',
      });
    }
   }else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill up all the Fields",
      
    });
   }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-semibold mb-4 text-center">Send Email</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipient">
            Recipient Email:
          </label>
          <input
            id="recipient"
            type="email"
            value={recipient}
            readOnly
            
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
            Subject:
          </label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="text">
            Text:
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between w-full">
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Sending...' : 'Send Email'}
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default contactUs;
