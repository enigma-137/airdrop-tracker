'use client'
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { validationSchema } from '@/app/validationSchema';
import Spinner from '@/app/components/Spinner';


interface AirdropForm {
    title: string;
    description: string;
    url: string;
    chain: string;
}

const NewAirdropsPage = () => {

    const [error, setError] = useState("")
    const [submitting, setSubmitting] = useState(false)

     const {register, control, handleSubmit, formState: {errors} } = useForm<AirdropForm>({
        resolver: zodResolver(validationSchema)
     })
     const router = useRouter()
  return (

    <div className='max-w-xl'>
        

   {  error && <Callout.Root color="red" className='mb-5'>
    <Callout.Icon>
      
    </Callout.Icon>
    <Callout.Text>
      {error}
    </Callout.Text>
  </Callout.Root>
 }
    <form className='space-y-3' onSubmit={handleSubmit(async (data)=> {

        try {
          // 
            await axios.post("/api/airdrops", data);
            router.push("/airdrops") 
            setSubmitting(true)
        } catch (error) {
            setError("An unexpected error has occured!")
            setSubmitting(false)
        }
        
    })}>
        <TextField.Root placeholder='Add Airdrop Name' {...register('title')}>
        </TextField.Root>
        {errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}
        <TextField.Root placeholder='Add Airdrop chain' {...register('chain')}>
        </TextField.Root>
        {errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}
        <TextField.Root placeholder='Add Project URL' {...register('url')}>
        </TextField.Root>
        {errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}
        <Controller 
        name='description'
        control={control}  //using controller because SimpleMde doesn't fuck with 'register'
        render={({field}) =>  <SimpleMDE  placeholder='Add a little Description' {...field}/> } //react library 
        />
       {errors.description && <Text as='p' color='red'>{errors.description.message}</Text>}

        <Button disabled={submitting} >Add.. {submitting && <Spinner /> }  </Button>

    </form>
    </div>
  )
}

export default NewAirdropsPage
