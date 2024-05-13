
"use client"
import { Box, Button, Card, Text } from '@radix-ui/themes'
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

    <div >
      <div className='flex flex-col justify-evenly'>
{/* search */}
      </div>
     <div  className='grid grid-cols-4 gap-4'>

          {airdrops.map((airdrop) => (
                <div>
 <Box maxWidth="350px" >
                 <Card asChild>
                   <a href="#">
                     <Text as="div" size="2" weight="bold">
                       {airdrop.title}
                     </Text>
                     
                     <Text as="div" color="gray" size="2">
                      {airdrop.description}
                     </Text>
                   </a>
                 </Card>
               </Box>
                </div>
          ))}
      {/* 
      
      <tr key={airdrop.id} className="hover:bg-gray-100">
              <td className="border border-gray-500 px-4 py-2">{airdrop.title}</td>
              <td className="border border-gray-500 px-4 py-2">{airdrop.description}</td>
              <td className="border border-gray-500 px-4 py-2">{airdrop.status}</td>
              <td className="border border-gray-500 px-4 py-2">{new Date(airdrop.createdAt).toLocaleDateString()}</td>
            </tr>*/}
    </div>
 
    {/* <div className='pt-4'>
    <Button className='mt-4'>
         <Link href="/airdrops/new">New Airdrop</Link>
     </Button>
    </div> */}
    </div>
    


  );
};

export default AirdropTable;


