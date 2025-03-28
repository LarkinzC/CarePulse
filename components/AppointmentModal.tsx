"use client"

import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from './ui/button'

const AppointmentModal = ({ type }: {
    type: 'schedule' | 'cancel'
}) => {

    const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger>
    <Button variant='ghost' className={`capitalize ${type === 'schedule' && 'text-green-500'}`}>
        {type}
    </Button>
  </DialogTrigger>
  <DialogContent className='shad-dialogue sm:max-w-md'>
    <DialogHeader className='mb-4 space-y-3'>
      <DialogTitle className='capitalize'>{type} Appointment</DialogTitle>
      <DialogDescription>
        Please fill in the following details to {type} an appointment
      </DialogDescription>
    </DialogHeader>
    
  </DialogContent>
</Dialog>
  )
}

export default AppointmentModal