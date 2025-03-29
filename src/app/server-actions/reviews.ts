'use server'

import { ReviewFormValues, reviewSchema } from '@/lib/form-schemas'
import { handleError } from '@/lib/utils'
import { Car, Customer, Lease } from '@/payload-types'
import config from '@/payload.config'
import { getPayload } from 'payload'
import { getUser } from './customers'

export async function getHomeReviews() {
  const payload = await getPayload({ config })
  try {
    const { docs: reviews } = await payload.find({
      collection: 'reviews',
      where: {
        approved: {
          equals: true,
        },
      },
      limit: 3,
    })
    return reviews || null
  } catch (error) {
    handleError(error, 'Failed fetching reviews!')
  }
}

export async function getCarReviews(carId: number) {
  const payload = await getPayload({ config })
  try {
    const { docs: reviews } = await payload.find({
      collection: 'reviews',
      where: {
        and: [
          {
            approved: {
              equals: true,
            },
          },
          {
            carRented: {
              equals: carId,
            },
          },
        ],
      },
    })
    return reviews || null
  } catch (error) {
    handleError(error, 'Failed fetching reviews!')
  }
}

export async function getUserReviews(user: Customer) {
  const payload = await getPayload({ config })
  try {
    const { docs: reviews } = await payload.find({
      collection: 'reviews',
      where: {
        and: [
          {
            approved: {
              equals: true,
            },
          },
          {
            user: {
              equals: user,
            },
          },
        ],
      },
    })
    return reviews || null
  } catch (error) {
    handleError(error, 'Failed fetching user reviews!')
  }
}

export async function checkUserAndCarReview(lease: Lease) {
  const payload = await getPayload({ config })
  try {
    const { docs: reviews } = await payload.find({
      collection: 'reviews',
      where: {
        and: [
          {
            author: {
              //@ts-expect-error type
              equals: lease.customer.id,
            },
          },
          {
            carRented: {
              //@ts-expect-error type
              equals: lease.car.id,
            },
          },
        ],
      },
    })
    if (reviews.length !== 0) return true
    return false
  } catch (error) {
    handleError(error, 'Failed fetching review!')
  }
}

export async function getUserAndCarReview(lease: Lease) {
  const payload = await getPayload({ config })
  try {
    const { docs: reviews } = await payload.find({
      collection: 'reviews',
      where: {
        and: [
          {
            author: {
              //@ts-expect-error type
              equals: lease.customer.id,
            },
          },
          {
            carRented: {
              //@ts-expect-error type
              equals: lease.car.id,
            },
          },
        ],
      },
    })
    return reviews[0] || null
  } catch (error) {
    handleError(error, 'Failed fetching review!')
  }
}

export async function createReview(car: Car, formData: ReviewFormValues) {
  const user = await getUser()
  const validatedData = reviewSchema.parse(formData)
  const payload = await getPayload({ config })
  try {
    await payload.create({
      collection: 'reviews',
      data: {
        ...validatedData,
        author: user,
        carRented: car,
        approved: true,
      },
    })
  } catch (error) {
    handleError(error, 'Failed fetching review!')
  }
}
