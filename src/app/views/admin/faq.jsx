import React from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";



const faq = () => {
  return (
    <div className='pl-12'>
      <div className='pl-24 pr-12'>
        <h1>Answers for your Queries...</h1>
        {/* <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        > */}
          <TextField className='bg-[#F0F8FF] font-white align-items-center' name="message" fullWidth></TextField>
          <div className='pt-3'>
            <button className='border-none px-4 py-1'>SUBMIT</button>
          </div>
        {/* </Box> */}
      </div>
    </div>
  )
}

export default faq
