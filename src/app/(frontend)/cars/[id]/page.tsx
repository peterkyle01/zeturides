import { getSingleCar } from '@/app/server-actions/cars'
import CarDetails from './car-detail'
import { getUser } from '@/app/server-actions/customers'

export default async function CarDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [user, carData] = await Promise.all([getUser(), getSingleCar({ id })])

  return (
    <div className="min-h-screen bg-background">
      <CarDetails car={carData} user={user} />
    </div>
  )
}
