import { getSingleCar } from '@/app/server-actions/cars'
import CarDetails from './car-detail'
import { getUser } from '@/app/server-actions/customers'
import { getOneLease } from '@/app/server-actions/leases'

export default async function CarDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [user, car] = await Promise.all([getUser(), getSingleCar({ id })])
  const lease = user ? await getOneLease(car, user) : null

  return (
    <div className="min-h-screen bg-background">
      <CarDetails car={car} user={user} lease={lease} />
    </div>
  )
}
