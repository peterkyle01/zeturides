'use server'

import config from '@/payload.config'
import { getPayload } from 'payload'
import { getDaysDifference, handleError } from '@/lib/utils'
import { getUser } from './customers'
import { CreateLeaseFormData, createLeaseSchema } from '@/lib/form-schemas'
import { Car, Customer } from '@/payload-types'

export async function createLease(car: Car, formData: CreateLeaseFormData) {
  const user = await getUser()
  const validatedData = createLeaseSchema.parse(formData)
  const payload = await getPayload({ config })
  const days = getDaysDifference(new Date(validatedData.startDate), new Date(validatedData.endDate))
  try {
    await payload.create({
      collection: 'leases',
      data: {
        ...validatedData,
        car: car,
        customer: user,
        paymentStatus: 'pending',
        totalAmount: car.dailyRate * days,
      },
    })
  } catch (error) {
    return handleError(error, 'Failed To Rent')
  }
}

export async function getOneLease(car: Car, user: Customer) {
  const payload = await getPayload({ config })
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

export async function getAllUserLeases() {
  const user = await getUser()
  const payload = await getPayload({ config })
  if (user) {
    const { docs: lease } = await payload.find({
      collection: 'leases',
      where: {
        customer: {
          equals: user.id,
        },
      },
    })
    return lease || null
  }
}
