'use server'

import config from '@/payload.config'
import { getPayload } from 'payload'
import { z } from 'zod'
import { headers as getHeaders } from 'next/headers'
import { cookies } from 'next/headers'
import { Customer } from '@/payload-types'
import { handleError } from '@/lib/utils'
import { EditProfileFormData } from '@/lib/form-schemas'

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
  const res = await payload.auth({ headers })

  // @ts-expect-error type
  const { user }: { user: Customer } = res

  return user
}

export async function signUpUser(formData: SignUpUFormData) {
  try {
    // Validate form data
    const validatedData = signUpUserSchema.parse(formData)
    const payload = await getPayload({ config })

    // Check if user already exists
    const existingUser = await payload.find({
      collection: 'customers',
      where: { email: { equals: validatedData.email } },
    })

    if (existingUser.totalDocs > 0) {
      return { error: 'A user with this email already exists' }
    }

    await payload.create({
      collection: 'customers',
      data: validatedData,
    })

    // Auto-login after successful registration
    return await signInUser({
      email: validatedData.email,
      password: validatedData.password,
      remember: false,
    })
  } catch (error) {
    return handleError(error, 'Failed to create user')
  }
}

export async function signInUser(formData: SignInFormData) {
  try {
    // Validate form data
    const validatedData = signInSchema.parse(formData)
    const payload = await getPayload({ config })

    // Find user and verify credentials
    const { docs: users } = await payload.find({
      collection: 'customers',
      where: { email: { equals: validatedData.email } },
    })

    if (users.length === 0) {
      return { error: 'Sign up first!' }
    }

    const result = await payload.login({
      collection: 'customers',
      data: validatedData,
    })

    if (!result.token) {
      return { error: 'Invalid email or password' }
    }

    ;(await cookies()).set('payload-token', result.token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return { success: true, token: result.token }
  } catch (error) {
    return handleError(error, 'Failed to sign in')
  }
}

export async function signOutUser() {
  try {
    ;(await cookies()).set('payload-token', '', {
      httpOnly: true,
      path: '/',
      maxAge: 0,
    })
  } catch (error) {
    return handleError(error, 'Error signing out')
  }
}

export async function editCustomer(customerId: number, updatedData: EditProfileFormData) {
  try {
    const payload = await getPayload({ config })

    const updatedCustomer = await payload.update({
      collection: 'customers',
      id: customerId,
      data: {
        ...(updatedData as unknown as Partial<Customer>),
        isValid: false,
      },
    })

    return updatedCustomer
  } catch (error) {
    console.error('Error updating customer:', error)
    return handleError(error, 'Error updating customer')
  }
}
