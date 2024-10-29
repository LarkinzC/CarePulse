"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { userFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"

 
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

      <SubmitButton isLoading={isLoading}>
        Get Started
      </SubmitButton>
    </form>
  </Form>
  )
}

export default RegisterForm