'use server'

import { handleError } from '@/lib/utils'
import { Car, Customer } from '@/payload-types'
import config from '@/payload.config'
import { getPayload } from 'payload'

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
