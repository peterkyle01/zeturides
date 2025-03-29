'use server'

import config from '@/payload.config'
import { getPayload } from 'payload'
import { getDaysDifference, handleError } from '@/lib/utils'
import { getUser } from './customers'
import { CreateLeaseFormData, createLeaseSchema } from '@/lib/form-schemas'
import { Car, Customer, Lease } from '@/payload-types'

export async function createLease(car: Car, formData: CreateLeaseFormData) {
  const user = await getUser()
  const validatedData = createLeaseSchema.parse(formData)
  const payload = await getPayload({ config })
  const days = getDaysDifference(new Date(validatedData.startDate), new Date(validatedData.endDate))

  try {
    await Promise.all([
      payload.create({
        collection: 'leases',
        data: {
          ...validatedData,
          car: car,
          customer: user,
          paymentStatus: 'pending',
          totalAmount: car.dailyRate * days,
        },
      }),
      payload.update({
        collection: 'cars',
        id: car.id,
        data: { available: false },
      }),
    ])
  } catch (error) {
    return handleError(error, 'Failed To Rent')
  }
}

export async function getOneLease(car: Car, user: Customer) {
  const payload = await getPayload({ config })
  if (user) {
    const { docs: lease } = await payload.find({
      collection: 'leases',
      where: {
        and: [
          {
            car: {
              equals: car.id,
            },
          },
          {
            customer: {
              equals: user.id,
            },
          },
        ],
      },
    })
    return lease[0] || null
  }
}

export async function getAllUserLeases(userId: number) {
  const payload = await getPayload({ config })
  if (userId) {
    const { docs: lease } = await payload.find({
      collection: 'leases',
      where: {
        customer: {
          equals: userId,
        },
      },
    })
    return lease || null
  }
}

export async function cancelLease(lease: Lease) {
  const payload = await getPayload({ config })
  try {
    await Promise.all([
      payload.update({
        collection: 'leases',
        id: lease.id,
        data: { paymentStatus: 'cancelled' },
      }),
      payload.update({
        collection: 'cars',
        // @ts-expect-error no-id-type
        id: lease.car.id,
        data: { available: true },
      }),
    ])
  } catch (error) {
    return handleError(error, 'Failed to Cancel!')
  }
}

export async function cancelUserLeases(customerId: number) {
  const payload = await getPayload({ config })
  try {
    await payload.update({
      collection: 'leases',
      where: {
        and: [
          {
            customer: { equals: customerId },
          },
          {
            paymentStatus: {
              equals: 'pending',
            },
          },
        ],
      },
      data: { paymentStatus: 'cancelled' },
    })
  } catch (error) {
    return handleError(error, 'Error updating leases!')
  }
}

export async function paidLease(lease: Lease) {
  const payload = await getPayload({ config })
  try {
    await payload.update({
      collection: 'leases',
      id: lease.id,
      data: { paymentStatus: 'paid' },
    })
  } catch (error) {
    return handleError(error, 'Failed to Lease!')
  }
}
