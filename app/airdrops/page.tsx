
"use client"
import { AlertDialog, Box, Button, Card, Callout, Select, Text, TextField } from '@radix-ui/themes'
import Link from 'next/link'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { validationSchema } from '@/app/validationSchema';
import Spinner from '@/app/components/Spinner';


interface AirdropForm {
  title: string;
  description: string;
  url: string;
  chain: string;
}

interface Airdrop {
  id: number;
  title: string;
  description: string;
  status: string;
  chain: string;
  url: string;
  createdAt: Date;
}

const AirdropTable = () => {
  const [airdrops, setAirdrops] = useState<Airdrop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filteredAirdrops, setFilteredAirdrops] = useState<Airdrop[]>([]);

  // DISPLAY CURRENT DROPS

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


  const [error, setError] = useState("")
  // const [submitting, setSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<AirdropForm>({
    resolver: zodResolver(validationSchema)
  })

 const onSubmit = async (data: any) => {

    try {

      console.log(data, "Success")

      const myData = await axios.post("/api/airdrops", data);


      console.log(myData)
      router.push("/airdrops")
      // setSubmitting(true)
    } catch (error) {
      setError("An unexpected error has occured!")
      // setSubmitting(false)
    }

  }
  const router = useRouter()

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

          <TextField.Root
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search for drops…"
            className="py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:border-violet-500"

          >
            <TextField.Slot>
              <FaMagnifyingGlass height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </div>

        {/* Button */}

        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button variant='solid'>Got New Drop? Add Now+</Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content size="4">

            <div className='max-w-xl'>
              {error && <Callout.Root color="red" className='mb-5'>
                <Callout.Icon>

                </Callout.Icon>
                <Callout.Text>
                  {error}
                </Callout.Text>
              </Callout.Root>
              }

        

              <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
                <TextField.Root placeholder='Add Airdrop Name' size='3' className='' {...register('title')}>
                </TextField.Root>
                {errors.title && <Text size="1" color='red' as='p'>{errors.title.message}</Text>}


                <div className='flex flex-col gap-3'>

                  <TextField.Root placeholder='Add Airdrop chain' size='3' {...register('chain')}>
                  </TextField.Root>
                  {errors.title && <Text size="1" color='red' as='p'>{errors.chain?.message}</Text>}

                  {/* <TextField.Root placeholder='Add Project URL' size="3" {...register('url')}>
                  </TextField.Root>
                  {errors.title && <Text color='red' size="1" as='p'>{errors.description?.message}</Text>}
 */}

                </div>


                <Select.Root size="3" defaultValue="open">
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Item value="open">Open</Select.Item>
                    <Select.Item value="in-progress">In-Progress</Select.Item>
                    <Select.Item value="close">End</Select.Item>
                  </Select.Content>
                </Select.Root>

                <TextField.Root placeholder='Add Project description' size='3' {...register('description')}>
                </TextField.Root>
                {errors.title && <Text color='red' size="1" as='p'>{errors.description?.message}</Text>}


                <div className='flex gap-6'>
                  {/* <Button className='flex' type='submit' disabled={submitting} >Add.. {submitting && <Spinner />}  </Button> */}
                  <input type='submit' />

                  <AlertDialog.Cancel>
                    <Button variant="soft" color="gray">
                      Cancel
                    </Button>
                  </AlertDialog.Cancel>
                </div>


              </form>
            </div>




          </AlertDialog.Content>

        </AlertDialog.Root>


        {/* <div className='pb-3 flex justify-end'>
          <Button className='mt-4 flex justify-between'>
            <Link href="/airdrops/new" className='flex gap-x-2 items-center' > <CiCirclePlus className='font-bold size-6' /> <span>New Airdrop</span></Link>
          </Button>
        </div> */}
      </div>

      {/* Display filtered airdrops */}
      <div className='grid grid-cols-4 gap-4'>
        {filteredAirdrops.map((airdrop) => (
          <div key={airdrop.id}>

            {!airdrop ? <p>Oops no airdrop yet..</p> : <Box maxWidth="350px">
              <Card asChild>
                <a href="#">
                  <Text as="div" size="2" weight="bold">
                    {airdrop.title}
                  </Text>
                  <Text as="div" color="gray" size="2">
                    {airdrop.chain}
                  </Text>

                  <Text as="div" color="gray" size="2">
                    {airdrop.description}

                  </Text>
                  <Text className="px-2 py-2">{airdrop.status}</Text>

                  <Text as="div" color="gray" size="2">
                    {airdrop.url}
                  </Text>

                  <Text className="px-2 py-2">{new Date(airdrop.createdAt).toLocaleDateString()}</Text>
                </a>
              </Card>
            </Box>}

          </div>
        ))}
      </div>
      <div>
        {/* <SignOutButton /> */}
      </div>

    </div>
  );
};

export default AirdropTable;


