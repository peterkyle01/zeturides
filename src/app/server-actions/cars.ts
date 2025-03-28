'use server'

import { handleError } from '@/lib/utils'
import { Car } from '@/payload-types'
import config from '@/payload.config'
import { getPayload } from 'payload'

export async function getCars() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { docs: cars } = await payload.find({
    collection: 'cars',
  })
  return cars
}

export async function getSingleCar({ id }: { id: string }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const car = await payload.findByID({
    collection: 'cars',
    id,
  })
  return car
}

export async function getFilteredCars({
  model,
  transmission,
  fuelType,
  pricePerDay,
  category,
}: {
  model?: string
  transmission?: string
  fuelType?: string
  pricePerDay?: number
  category?: string
}) {
  const payload = await getPayload({ config })

  let categoryFound = await payload.find({
    collection: 'categories',
    where: {
      name: {
        equals: category,
      },
    },
  })

  // Ensure categoryFound has results
  if (!categoryFound?.docs?.length) {
    //@ts-expect-error type
    categoryFound = null
  } else {
    //@ts-expect-error type
    categoryFound = categoryFound.docs[0] // Get the first matching category
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filters: any = {
      collection: 'cars',
      where: {},
    }

    if (transmission) filters.where.transmission = { equals: transmission }
    if (fuelType) filters.where.fuelType = { equals: fuelType }
    if (model)
      filters.where = {
        or: [
          { model: { like: model } },
          { make: { like: model } },
          { year: { like: Number(model) } },
        ],
      }
    if (pricePerDay) filters.where.dailyRate = { less_than_equal: pricePerDay }

    // Only add category filter if a valid category was found
    if (categoryFound) {
      //@ts-expect-error type
      filters.where.categories = { equals: categoryFound.id }
    }

    const { docs } = await payload.find(filters)
    return docs as Car[]
  } catch (error) {
    handleError(error, 'Failed to Filter!')
    return []
  }
}
