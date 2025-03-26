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
  transmission,
  pricePerDay,
  fuelType,
  model,
}: {
  transmission?: string
  pricePerDay?: number
  fuelType?: string
  model?: string
}) {
  const payload = await getPayload({ config })

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filters: any = {
      collection: 'cars',
      where: {},
    }

    if (transmission) filters.where.transmission = { equals: transmission }
    if (fuelType) filters.where.fuelType = { equals: fuelType }
    if (model) filters.where.model = { equals: model }
    if (pricePerDay) filters.where.dailyRate = { less_than_equal: pricePerDay }

    const { docs } = await payload.find(filters)
    return docs as Car[]
  } catch (error) {
    handleError(error, 'Failed to Filter!')
    return []
  }
}
