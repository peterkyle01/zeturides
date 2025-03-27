import { getSingleCar } from '@/app/server-actions/cars'
import CarDetails from './car-detail'
import { getUser } from '@/app/server-actions/customers'
import { getOneLease } from '@/app/server-actions/leases'
import { getCarReviews } from '@/app/server-actions/reviews'
import { calculateAverageRating, processReviewRatings } from '@/lib/utils'

export default async function CarDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [user, car] = await Promise.all([getUser(), getSingleCar({ id })])

  const [lease, reviews] = await Promise.all([getOneLease(car, user), getCarReviews(car.id)])

  const views = processReviewRatings(reviews!)

  const avgRating = calculateAverageRating(reviews!)

  console.log(avgRating)

  return (
    <div className="min-h-screen bg-background">
      <CarDetails car={car} user={user} lease={lease} reviews={views} avgRating={avgRating} />
    </div>
  )
}
