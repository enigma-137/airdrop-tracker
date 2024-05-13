
"use client"
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'


// Edit Airdrop
// Toggle Status
// 


import { useEffect, useState } from 'react';
import axios from 'axios';



interface Airdrop {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
}

const AirdropTable = () => {
  const [airdrops, setAirdrops] = useState<Airdrop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAirdrops = async () => {
      try {
        const response = await axios.get('/api/airdrops/list');
        setAirdrops(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching airdrops");
        setLoading(false);
      }
    };

    fetchAirdrops();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (

    <div className='py-5'>
     <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-500">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-500 px-4 py-2">Title</th>
            <th className="border border-gray-500 px-4 py-2">Description</th>
            <th className="border border-gray-500 px-4 py-2">Status</th>
            <th className="border border-gray-500 px-4 py-2">Date of Creation</th>
          </tr>
        </thead>
        <tbody>
          {airdrops.map((airdrop) => (
            <tr key={airdrop.id} className="hover:bg-gray-100">
              <td className="border border-gray-500 px-4 py-2">{airdrop.title}</td>
              <td className="border border-gray-500 px-4 py-2">{airdrop.description}</td>
              <td className="border border-gray-500 px-4 py-2">{airdrop.status}</td>
              <td className="border border-gray-500 px-4 py-2">{new Date(airdrop.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className='pt-4'>
    <Button className='mt-4'>
         <Link href="/airdrops/new">New Airdrop</Link>
     </Button>
    </div>
  
    </div>
    


  );
};

export default AirdropTable;


