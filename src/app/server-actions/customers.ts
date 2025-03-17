'use server'

import { redirect } from 'next/navigation'
import config from '@/payload.config'
import { getPayload } from 'payload'

export async function createUser(formData: FormData) {
  // Validate data (basic example)
  if (formData.get('password') !== formData.get('confirmPassword')) {
    // In a real app, you'd want to return this error to the form
    console.error("Passwords don't match")
    return { error: "Passwords don't match" }
  }

  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const customer = await payload.create({
      collection: 'customers',
      data: {
        firstName: formData.get('firstName')?.toString() || '',
        lastName: formData.get('lastName')?.toString() || '',
        email: formData.get('email')?.toString() || '',
        password: formData.get('password')?.toString() || '',
        phoneNumber: formData.get('phoneNumber')?.toString() || '',
        address: formData.get('address')?.toString() || '',
      },
    })

    console.log('Customer created:', customer)
    redirect('/sign-up/success')
  } catch (error: any) {
    console.error('Error creating user:', error)
    // Extract more detailed error information if available
    if (error.errors) {
      console.error('Validation errors:', error.errors)
      return { error: 'Validation failed. Please check your information.', details: error.errors }
    }
    return { error: 'Failed to create user. Please try again.' }
  }
}
