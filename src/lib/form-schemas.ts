import { z } from 'zod'

export const createLeaseSchema = z.object({
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  pickupLocation: z.string().min(1, 'Pickup location is required'),
  returnLocation: z.string().min(1, 'Return location is required'),
  notes: z.string().optional(),
})

export type CreateLeaseFormData = z.infer<typeof createLeaseSchema>

export const editProfileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phoneNumber: z.string().min(10, 'Please enter a valid phone number'),
  address: z.string().min(5, 'Please enter a valid address'),
  idNumber: z.string().min(1, 'ID number is required'),
  licenseNumber: z.string().min(1, 'License number is required'),
  licenseExpiryDate: z.string().min(1, 'License expiry date is required'),
})

export type EditProfileFormData = z.infer<typeof editProfileSchema>

export const contactFormSchema = z.object({
  fullname: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

export const reviewSchema = z.object({
  rating: z.enum(['one', 'two', 'three', 'four', 'five'], {
    required_error: 'Please select a rating',
  }),
  reviewText: z.string().min(10, {
    message: 'Review must be at least 10 characters.',
  }),
})

export type ReviewFormValues = z.infer<typeof reviewSchema>
