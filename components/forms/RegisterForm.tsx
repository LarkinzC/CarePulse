"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form, FormControl} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { userFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions } from "@/constants"
import { Label } from "../ui/label"
import Image from "next/image"
import { SelectItem } from "../ui/select"

 
const RegisterForm = ({user}: { user: User}) => {
  const router= useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof userFormValidation>>({
    resolver: zodResolver(userFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit({name, email, phone }: z.infer<typeof userFormValidation>) {
    setIsLoading(true)

    try {
      const userData = {name, email, phone}
      console.log('form submitting...')
      const user = await createUser(userData)

      console.log(user)

      if(user) 
        router.push(`/patients/${user.$id}/register`)
    } catch(error) {
      console.log(error)
    }
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
      <section className="mb-12 space-y-4">
        <h1 className="header">Welcome 👋</h1>
        <p className="text-dark-700">Let us know more about yourself.</p>
      </section>
      <section className="mb-12 space-y-6">
        <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal information</h2>
        </div>
      </section>

      <CustomFormField 
      fieldType={FormFieldType.INPUT}
      control={form.control}
      name='name'
      label='Full name'
      placeholder= 'John Doe'
      iconSrc='/assets/icons/user.svg'
      iconAlt='user'
      />

      <div className="flex flex-col gap-6 xl:flex-row">

      <CustomFormField 
      fieldType={FormFieldType.INPUT}
      control={form.control}
      name='email'
      label='Email'
      placeholder= 'Johndoe@gmail.com'
      iconSrc='/assets/icons/email.svg'
      iconAlt='email'
      />

      <CustomFormField 
      fieldType={FormFieldType.PHONE_INPUT}
      control={form.control}
      name='phone'
      label='Phone Number'
      placeholder= '(999) 123-4567'
      iconSrc='/assets/icons/email.svg'
      iconAlt='email'
      />
      </div>
      <div className="flex flex-col gap-6 xl:flex-row">
      <CustomFormField 
      fieldType={FormFieldType.DATE_PICKER}
      control={form.control}
      name='birthDate'
      label='Date of Birth'
      />

      <CustomFormField 
      fieldType={FormFieldType.SKELETON}
      control={form.control}
      name='Gender'
      label='Gender'
      renderSkeleton={(field) => (
        <FormControl>
          <RadioGroup className="flex h-11 gap-6 xl:justify-between" onValueChange={field.onChange} defaultValue={field.value}>
            {GenderOptions.map((option) => (
              <div key={option} className="radio-group">
                <RadioGroupItem value={option} id={option}/>
                <Label htmlFor={option} className="cursor-pointer">
                  {option}
                </Label>
              </div>
              
            ))}
          </RadioGroup>
        </FormControl>
      )}
      />
      </div>
      
      <div className="flex flex-col gap-6 xl:flex-row">
      <CustomFormField 
      fieldType={FormFieldType.INPUT}
      control={form.control}
      name='address'
      label='Address'
      placeholder= '14th St., New York'
      />
      <CustomFormField 
      fieldType={FormFieldType.INPUT}
      control={form.control}
      name='occupation'
      label='Occupation'
      placeholder= 'Software Engineer'
      />


      </div>
      <div className="flex flex-col gap-6 xl:flex-row">
      <CustomFormField 
      fieldType={FormFieldType.INPUT}
      control={form.control}
      name='emergencyContactName'
      label='Emergency contact name'
      placeholder= "Guardian's name"
      />
      <CustomFormField 
      fieldType={FormFieldType.PHONE_INPUT}
      control={form.control}
      name='emergencyContactNumber'
      label='Emergency contact number'
      placeholder= '(999) 123-4567'
      />
      </div>
      <section className="mb-12 space-y-6">
        <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical information</h2>
        </div>
      </section>

      <CustomFormField 
      fieldType={FormFieldType.SELECT}
      control={form.control}
      name='primaryPhysician'
      label='Primary Physician'
      placeholder= 'Select a physician'
      >
        {Doctors.map((doctor) => (
          <SelectItem key={doctor.name} value={doctor.name}>
            <div className="flex cursor-pointer items-center gap-2">
              <Image src={doctor.image}
              width={32}
              height={32}
              alt={doctor.name}
              className="rounded-full border border-x-dark-500"/>
              <p>{doctor.name}</p>
            </div>
          </SelectItem>
        ))}
      </CustomFormField>

      <div className="flex flex-col gap-6 xl:flex-row">
          
      </div>
      <div className="flex flex-col gap-6 xl:flex-row">
          
      </div>

      <SubmitButton isLoading={isLoading}>
        Get Started
      </SubmitButton>
    </form>
  </Form>
  )
}

export default RegisterForm