'use client'

import React, { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { contactFormSchema, ContactFormValues } from '@/lib/form-schemas'
import { postContactUs } from '@/app/server-actions/contact-us'

export default function ContactUs() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullname: '',
      email: '',
      message: '',
    },
  })

  const onSubmit = async (data: ContactFormValues) => {
    await postContactUs(data)
    setIsSubmitted(true)
    form.reset()
  }

  return (
    <div className="max-w-2xl mx-auto min-h-screen flex justify-center items-center px-2">
      <div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Get in Touch</h1>
            <p className="text-gray-600">
              We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as
              possible.
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Thank You!</h2>
              <p className="text-gray-600 mb-4">Your message has been sent successfully.</p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Send another message
              </button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your message here..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button
                  type="submit"
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </Form>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          Need immediate assistance? Email us at{' '}
          <a href="mailto:support@example.com" className="text-indigo-600 hover:text-indigo-500">
            support@zeturides.com
          </a>
        </div>
      </div>
    </div>
  )
}
