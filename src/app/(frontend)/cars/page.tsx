import CarsComponent from './cars-component'
import config from '@/payload.config'
import { getPayload } from 'payload'

export default async function CarsPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { docs: cars } = await payload.find({
    collection: 'cars',
  })
  console.log(cars)
  return (
    <div>
      <CarsComponent mockCars={cars} />
    </div>
  )
}
