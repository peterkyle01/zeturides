'use server'

import { redirect } from 'next/navigation'
import config from '@/payload.config'
import { getPayload } from 'payload'
import { z } from 'zod'
import { headers as getHeaders } from 'next/headers'

// Schema for user registration
const signUpUserSchema = z
  .object({
    firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
    lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string(),
    phoneNumber: z.string().optional(),
    address: z.string().min(5, { message: 'Please enter a valid address' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

// Schema for sign in
const signInSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  remember: z.boolean().default(false),
})

export type SignUpUFormData = z.infer<typeof signUpUserSchema>
export type SignInFormData = z.infer<typeof signInSchema>

export async function getUser() {
  const payload = await getPayload({ config })
  const headers = await getHeaders()
  const { user } = await payload.auth({ headers })

  return user
}

export async function signUpUser(formData: SignUpUFormData) {
  try {
    // Validate form data
    const validatedData = signUpUserSchema.parse(formData)

    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    // Check if user already exists
    const existingUser = await payload.find({
      collection: 'customers',
      where: {
        email: {
          equals: validatedData.email,
        },
      },
    })

    if (existingUser.totalDocs > 0) {
      return { error: 'A user with this email already exists' }
    }

    await payload.create({
      collection: 'customers',
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        password: validatedData.password,
        phoneNumber: validatedData.phoneNumber || '',
        address: validatedData.address,
      },
    })

    redirect('/sign-up/success')
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: 'Validation failed',
        details: error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      }
    }

    console.error('Error creating user:', error)
    return {
      error: 'Failed to create user. Please try again.',
      details: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export async function signInUser(formData: SignInFormData) {
  try {
    // Validate form data
    const validatedData = signInSchema.parse(formData)

    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    // Find user and verify credentials
    const { docs: users } = await payload.find({
      collection: 'customers',
      where: {
        email: {
          equals: validatedData.email,
        },
      },
    })

    if (users.length === 0) {
      return { error: 'Sign Up first!' }
    }

    const result = await payload.login({
      collection: 'customers',
      data: {
        email: validatedData.email,
        password: validatedData.password,
      },
    })

    if (!result.token) {
      return { error: 'Invalid email or password' }
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: 'Validation failed',
        details: error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      }
    }

    console.error('Error signing in:', error)
    return {
      error: 'Failed to sign in. Please try again.',
      details: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export async function signOutUser() {
  await fetch('http://localhost:3000/api/customers/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  console.log('logged out')
  redirect('/')
}
