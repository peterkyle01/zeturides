import React from 'react'
import { Calendar, MapPin, CreditCard, Clock, Car as CarIcon, User } from 'lucide-react'
import { Lease } from '@/payload-types'
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
import { Button } from '@/components/ui/button'
import { cancelLease } from '@/app/server-actions/leases'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()
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

  const onCancel = async () => {
    await cancelLease(lease)
    router.refresh()
  }

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

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <Calendar className="w-5 h-5 text-gray-500 mr-2" />
          <div>
            <p className="text-sm text-gray-500">Rental Period</p>
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
        <div className="border-t pt-4">
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
              <Button className="grow bg-rose-600 hover:bg-rose-800">Cancel</Button>
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
          <Button className="grow">Proceed To Checkout</Button>
        </div>
      )}
    </div>
  )
}
