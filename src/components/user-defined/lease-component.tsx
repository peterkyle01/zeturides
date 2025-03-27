import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { CalendarDays, CreditCard, MapPin, ClipboardList } from 'lucide-react'
import { Lease } from '@/payload-types'
import { Button } from '../ui/button'
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
} from '../ui/alert-dialog'
import { cancelLease } from '@/app/server-actions/leases'
import { useRouter } from 'next/navigation'
import { getDaysDifference } from '@/lib/utils'

const getPaymentStatusColor = (status: Lease['paymentStatus']) => {
  switch (status) {
    case 'paid':
      return 'bg-green-500/10 text-green-500 font-bold'
    case 'pending':
      return 'bg-yellow-500/10 text-yellow-500 font-bold'
    case 'refunded':
      return 'bg-blue-500/10 text-blue-500 font-bold'
    case 'cancelled':
      return 'bg-rose-500/10 text-rose-500 font-bold'
    default:
      return 'bg-gray-500/10 text-gray-500 font-bold'
  }
}

export function LeaseComponent({ lease }: { lease: Lease }) {
  const router = useRouter()
  const onCancel = async () => {
    await cancelLease(lease)
    router.refresh()
  }
  return (
    <Dialog>
      <DialogTrigger className="w-full" asChild>
        <Button className="w-full">View Order</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center my-6 justify-between ">
            Lease Order Number #{lease.id}
            <Image
              src="/zeturides.png"
              width={100}
              height={50}
              alt="zeturides_logo"
              className="invert"
            />
          </DialogTitle>
          <DialogDescription>
            Created on {format(new Date(lease.createdAt), 'PPP')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Payment Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Payment Status</span>
            </div>
            <Badge className={getPaymentStatusColor(lease.paymentStatus)}>
              {lease.paymentStatus.charAt(0).toUpperCase() + lease.paymentStatus.slice(1)}
            </Badge>
          </div>

          <Separator />

          {/* Dates */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                Rental Period&nbsp;(&nbsp;
                {getDaysDifference(new Date(lease.startDate), new Date(lease.endDate))} Days&nbsp;)
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 pl-6">
              <div>
                <p className="text-sm text-muted-foreground">Start Date</p>
                <p className="text-sm font-medium">{format(new Date(lease.startDate), 'PPP')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">End Date</p>
                <p className="text-sm font-medium">{format(new Date(lease.endDate), 'PPP')}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Locations */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Locations</span>
            </div>
            <div className="grid grid-cols-2 gap-4 pl-6">
              <div>
                <p className="text-sm text-muted-foreground">Pickup</p>
                <p className="text-sm font-medium">{lease.pickupLocation || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Return</p>
                <p className="text-sm font-medium">{lease.returnLocation || 'Not specified'}</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          {lease.notes && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ClipboardList className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Notes</span>
                </div>
                <p className="text-sm text-muted-foreground pl-6">{lease.notes}</p>
              </div>
            </>
          )}

          {/* Total Amount */}
          <div className="mt-6 flex items-center justify-between bg-muted p-4 rounded-lg">
            <span className="text-sm font-medium">Total Amount</span>
            <span className="text-lg font-bold">
              {lease.totalAmount.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
            </span>
          </div>
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
              <Button className="grow">Proceed To Checkout</Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
