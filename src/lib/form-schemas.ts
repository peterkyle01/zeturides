import { z } from 'zod'

export const createLeaseSchema = z.object({
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  leaseType: z.enum(['daily', 'monthly']),
  pickupLocation: z.string().min(1, 'Pickup location is required'),
  returnLocation: z.string().min(1, 'Return location is required'),
  notes: z.string().optional(),
})

export type CreateLeaseFormData = z.infer<typeof createLeaseSchema>
