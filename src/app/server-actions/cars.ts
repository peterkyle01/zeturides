'use server'

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
