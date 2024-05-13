
"use client"
import { Box, Button, Card, Select, Text, TextField } from '@radix-ui/themes'
import Link from 'next/link'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";

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
  const [searchText, setSearchText] = useState("");
  const [filteredAirdrops, setFilteredAirdrops] = useState<Airdrop[]>([]);

  useEffect(() => {
    const fetchAirdrops = async () => {
      try {
        const response = await axios.get('/api/airdrops/list');
        setAirdrops(response.data);
        setFilteredAirdrops(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching airdrops");
        setLoading(false);
      }
    };

    fetchAirdrops();
  }, []);

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = airdrops.filter(airdrop =>
      airdrop.title.toLowerCase().includes(text.toLowerCase()) ||
      airdrop.description.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredAirdrops(filtered);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='max-w-full'>
      <div className='flex justify-between'>
        {/* Search input */}
        <div className='flex justify-start'>
          <div className="relative pb-3">
            <input
              type="text"
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search for drops…"
              className="py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaMagnifyingGlass className="text-gray-500" />
            </div>
          </div>
        </div>

        {/* Button */}
        <div className='pb-3 flex justify-end'>
          <Button className='mt-4 flex justify-between'>
            <Link href="/airdrops/new"> <CiCirclePlus />New Airdrop</Link>
          </Button>
        </div>
      </div>

      {/* Display filtered airdrops */}
      <div className='grid grid-cols-4 gap-4'>
        {filteredAirdrops.map((airdrop) => (
          <div key={airdrop.id}>
            <Box maxWidth="350px">
              <Card asChild>
                <a href="#">
                  <Text as="div" size="2" weight="bold">
                    {airdrop.title}
                  </Text>
                  <Text as="div" color="gray" size="2">
                    {airdrop.description}
                  </Text>
                  <Text className="px-2 py-2">{airdrop.status}</Text>
                  <Text className="px-2 py-2">{new Date(airdrop.createdAt).toLocaleDateString()}</Text>
                </a>
              </Card>
            </Box>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AirdropTable;


