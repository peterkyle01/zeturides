import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Calendar, MapPin, CreditCard } from 'lucide-react'
import Image from 'next/image'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AlertDialogDescription } from '@radix-ui/react-alert-dialog'
import { Textarea } from '../ui/textarea'
import { CreateLeaseFormData, createLeaseSchema } from '@/lib/form-schemas'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { createLease } from '@/app/server-actions/leases'
import { Car } from '@/payload-types'

export default function RentComponent({ car }: { car: Car }) {
  const router = useRouter()
  const form = useForm<CreateLeaseFormData>({
    resolver: zodResolver(createLeaseSchema),
    defaultValues: {
      startDate: new Date().toDateString(),
      endDate: new Date().toDateString(),
      notes: '',
    },
  })

  async function onSubmit(values: CreateLeaseFormData) {
    try {
      const result = await createLease(car, values)
      router.refresh()
      if (result?.error) {
        toast.error(result?.error)
        return
      }
      toast.success('Rented Successfully!')
    } catch (error) {
      toast.error(error as string)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {car.available ? (
          <Button className="w-full">Rent Now</Button>
        ) : (
          <Button className="w-full" disabled>
            Not Available
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <Image
              src="/zeturides.png"
              width={100}
              height={50}
              alt="zeturides_logo"
              className="invert mx-auto"
            />
          </AlertDialogTitle>
          <AlertDialogDescription className="text-neutral-500 italic">
            Rent you ride now with Zeturides
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 max-w-4xl mx-auto md:p-2"
          >
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Start Date
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      End Date
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="pickupLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Pickup Location
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter pickup location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="returnLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Return Location
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter return location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea rows={3} placeholder="Any special requirements or notes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">Payment Information</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Payment will be processed securely after submission. You&apos;ll receive a
                confirmation email with payment details.
              </p>
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
              <AlertDialogAction type="submit">Continue</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
