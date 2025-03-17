'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { createUser } from '@/app/server-actions/customers'
import { toast } from 'sonner'

// Define the form schema with validation
const formSchema = z
  .object({
    firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
    lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string(),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    terms: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export default function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      address: '',
      terms: false,
    },
  })

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // Convert form data to FormData for the server action
      const formData = new FormData()
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value.toString())
      })

      // Call the server action
      const result = await createUser(formData)

      if (result?.error) {
        toast.error('An error occured!')
      } else {
        // Success - the server action should handle redirection
        toast.success('Account Created')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid w-full max-w-md gap-6">
            <div className="flex flex-col text-center space-y-2">
              <h1 className="text-3xl font-bold">Create an Account</h1>
              <p className="text-muted-foreground">Enter your information to create an account</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          First Name <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Last Name <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="name@example.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Password <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Confirm Password <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} type="tel" placeholder="(123) 456-7890" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Enter your address"
                          className="resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium leading-none">
                          I agree to the{' '}
                          <Link
                            href="#"
                            className="text-primary underline-offset-4 hover:underline"
                          >
                            terms of service
                          </Link>{' '}
                          and{' '}
                          <Link
                            href="#"
                            className="text-primary underline-offset-4 hover:underline"
                          >
                            privacy policy
                          </Link>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            </Form>

            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link href="/sign-in" className="text-primary underline-offset-4 hover:underline">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
