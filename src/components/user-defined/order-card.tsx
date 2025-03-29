import React, { useCallback, useEffect, useState } from 'react'
import { Calendar, MapPin, CreditCard, Clock, Car as CarIcon, User } from 'lucide-react'
import { Lease, Review } from '@/payload-types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { Star } from 'lucide-react'
import { ReviewFormValues, reviewSchema } from '@/lib/form-schemas'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { cancelLease, paidLease } from '@/app/server-actions/leases'
import { useRouter } from 'next/navigation'
import { getDaysDifference, getRatingIndex } from '@/lib/utils'
import {
  checkUserAndCarReview,
  createReview,
  getUserAndCarReview,
} from '@/app/server-actions/reviews'

interface OrderCardProps {
  lease: Lease
}

const PaymentStatusBadge = ({ status }: { status: Lease['paymentStatus'] }) => {
  const colors = {
    pending: 'bg-yellow-500/10 text-yellow-500 font-bold',
    paid: 'bg-green-500/10 text-green-500 font-bold',
    refunded: 'bg-blue-500/10 text-blue-500 font-bold',
    cancelled: 'bg-rose-500/10 text-rose-500 font-bold',
  }

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

export const OrderCard: React.FC<OrderCardProps> = ({ lease }) => {
  const [review, setReview] = useState<Review | null>(null)
  const router = useRouter()
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: review?.rating ?? 'three',
      reviewText: review?.reviewText ?? '',
    },
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(amount)
  }

  const onCancel = useCallback(async () => {
    await cancelLease(lease)
    router.refresh()
  }, [lease, router])

  const onSubmit = useCallback(
    async (data: ReviewFormValues) => {
      // @ts-expect-error car-type
      await createReview(lease.car, data)
      router.refresh()
    },
    [lease, router],
  )

  useEffect(() => {
    const fetchData = async () => {
      const fetchedReview = await getUserAndCarReview(lease)
      if (fetchedReview) {
        setReview(fetchedReview)
        form.reset({
          rating: fetchedReview.rating,
          reviewText: fetchedReview.reviewText,
        })
      }
    }
    fetchData()
  }, [lease.id, form, lease])

  return (
    <div className="space-y-6 w-full">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Order #{lease.id}</h3>
          <p className="text-sm text-gray-500">
            <Clock className="inline-block w-4 h-4 mr-1" />
            Created {formatDate(lease.createdAt)}
          </p>
        </div>
        <PaymentStatusBadge status={lease.paymentStatus} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <CarIcon className="w-5 h-5 text-gray-500 mr-2" />
          <span className="text-gray-700">
            {typeof lease.car === 'object'
              ? `${lease.car.make} ${lease.car.model} (${lease.car.year})`
              : 'Loading...'}
          </span>
        </div>
        <div className="flex items-center">
          <User className="w-5 h-5 text-gray-500 mr-2" />
          <span className="text-gray-700">
            {typeof lease.customer === 'object'
              ? lease.customer.firstName + ' ' + lease.customer.lastName
              : 'Loading...'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t pt-10">
        <div className="flex items-center">
          <Calendar className="w-5 h-5 text-gray-500 mr-2" />
          <div>
            <p className="text-sm text-gray-500">
              Rental Period&nbsp;(&nbsp;
              {getDaysDifference(new Date(lease.startDate), new Date(lease.endDate))} Days&nbsp;)
            </p>
            <p className="text-gray-700">
              {formatDate(lease.startDate)} - {formatDate(lease.endDate)}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <CreditCard className="w-5 h-5 text-gray-500 mr-2" />
          <div>
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-gray-700 font-semibold">{formatAmount(lease.totalAmount)}</p>
          </div>
        </div>
      </div>

      {(lease.pickupLocation || lease.returnLocation) && (
        <div className="border-t pt-10">
          <div className="grid grid-cols-2 gap-4">
            {lease.pickupLocation && (
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-gray-500 mr-2 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Pickup Location</p>
                  <p className="text-gray-700">{lease.pickupLocation}</p>
                </div>
              </div>
            )}
            {lease.returnLocation && (
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-gray-500 mr-2 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Return Location</p>
                  <p className="text-gray-700">{lease.returnLocation}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {lease.notes && (
        <div className="border-t pt-4">
          <p className="text-sm text-gray-500">Notes</p>
          <p className="text-gray-700">{lease.notes}</p>
        </div>
      )}
      {lease.paymentStatus === 'pending' && (
        <div className="flex justify-between gap-10">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="grow bg-rose-600 hover:bg-rose-800">Cancel Order</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your lease.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-rose-600 hover:bg-rose-800" onClick={onCancel}>
                  Cancel
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button
            className="grow"
            onClick={async () => {
              await paidLease(lease)
              router.refresh()
            }}
          >
            Proceed To Checkout(Paid)
          </Button>
        </div>
      )}
      {lease.paymentStatus === 'paid' && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="underline text-base font-medium">
                    {review !== null ? 'You rated this car !' : 'Rate this car'}
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      disabled={review !== null}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-6 "
                    >
                      {[
                        { value: 'one', label: '1', index: 1 },
                        { value: 'two', label: '2', index: 2 },
                        { value: 'three', label: '3', index: 3 },
                        { value: 'four', label: '4', index: 4 },
                        { value: 'five', label: '5', index: 5 },
                      ].map((rating) => (
                        <FormItem key={rating.value} className="flex flex-col items-center ">
                          <FormControl>
                            <RadioGroupItem
                              value={rating.value}
                              className="sr-only peer"
                              id={rating.value}
                            />
                          </FormControl>
                          <label htmlFor={rating.value} className="flex">
                            <Star
                              className={`w-4 h-4 ${
                                field.value && rating.index <= getRatingIndex(field.value)
                                  ? 'fill-yellow-500 text-yellow-500' // Apply yellow fill
                                  : 'peer-checked:fill-primary' // Default primary color
                              }`}
                            />
                            <span className="sr-only">{rating.label} Star</span>
                          </label>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reviewText"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={review !== null}
                      placeholder="Tell us about your experience..."
                      className="min-h-16 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {review == null && (
              <div className="flex justify-end">
                <Button type="submit" size="sm">
                  Submit Review
                </Button>
              </div>
            )}
          </form>
        </Form>
      )}
    </div>
  )
}
