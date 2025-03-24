import CarsComponent from '../../../components/user-defined/cars-component'
import config from '@/payload.config'
import { getPayload } from 'payload'

export default async function CarsPage() {
  const payload = await getPayload({ config })

  const [cars, categories] = await Promise.all([
    payload.find({ collection: 'cars' }),
    payload.find({ collection: 'categories' }),
  ])

  return (
    <div>
      <CarsComponent mockCars={cars.docs} categories={categories.docs} />
    </div>
  )
}
