import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, Car, CheckCircle, ChevronRight, Clock, Star } from 'lucide-react'
import Link from 'next/link'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { docs: recentCars } = await payload.find({
    collection: 'cars',
    sort: 'createdAt',
    limit: 6,
  })
  return (
    <div className="flex min-h-screen flex-col w-full">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted md:rounded-md">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Find Your Perfect Rental Car
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Choose from our wide selection of vehicles. Book easily and start your journey
                    today.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <form className="grid gap-4">
                    <div className="grid gap-2">
                      <Input placeholder="Pick-up Location" />
                      <div className="grid grid-cols-2 gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              Pick Date
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar />
                          </PopoverContent>
                        </Popover>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="9:00">9:00 AM</SelectItem>
                            <SelectItem value="10:00">10:00 AM</SelectItem>
                            <SelectItem value="11:00">11:00 AM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button type="submit" size="lg">
                      Search Cars
                    </Button>
                  </form>
                </div>
              </div>
              <div className="mx-auto aspect-video overflow-hidden rounded-md object-cover object-center sm:w-full lg:order-last">
                <Image
                  alt="Hero Image"
                  // @ts-expect-error url
                  src={recentCars?.[0].images?.[0].image.url}
                  width={600}
                  height={400}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Why Choose Us
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  We offer the best car rental experience with our premium services
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Wide Selection</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Choose from our diverse fleet of vehicles to match your needs
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Quality Guaranteed</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  All our vehicles are regularly maintained and inspected
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">24/7 Support</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our customer support team is always ready to help you
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Recently Added Cars Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Recently Added Cars
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Check out our latest additions to the fleet
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              {recentCars.map((car) => (
                <div
                  key={car.id}
                  className="group relative overflow-hidden rounded-lg border bg-background shadow-md transition-all hover:shadow-lg"
                >
                  <div className="aspect-video overflow-hidden">
                    <Image
                      // @ts-expect-error url
                      src={car.images?.[0]?.image.url}
                      width={400}
                      height={200}
                      alt={car.make}
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold">{car.model + ' ' + car.make}</h3>
                    <p className="text-sm text-muted-foreground">{car.make}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        From&nbsp;
                        <span className="text-lg font-bold text-foreground">
                          Ksh {car.dailyRate}
                        </span>
                        &nbsp;/day
                      </div>
                      <Link href={`/cars/${car.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Link href="/cars">
                <Button size="lg" className="gap-2">
                  View All Cars
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  How It Works
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Renting a car with us is quick and easy
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                  1
                </div>
                <h3 className="text-xl font-bold">Choose Your Car</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Browse our selection and pick the perfect vehicle for your needs
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                  2
                </div>
                <h3 className="text-xl font-bold">Book & Pay</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Complete your booking with our secure payment system
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                  3
                </div>
                <h3 className="text-xl font-bold">Enjoy Your Ride</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Pick up your car and start your journey with confidence
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  What Our Customers Say
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Dont just take our word for it
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col justify-between space-y-4 rounded-lg border bg-background p-6">
                <div className="space-y-2">
                  <div className="flex space-x-1">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <Star className="h-5 w-5 fill-primary text-primary" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    Great service and fantastic cars. Will definitely use again!
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-gray-100 p-2">
                    <span className="text-sm font-medium">JD</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Verified Customer</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-4 rounded-lg border bg-background p-6">
                <div className="space-y-2">
                  <div className="flex space-x-1">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <Star className="h-5 w-5 fill-primary text-primary" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    The booking process was smooth and the car was perfect!
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-gray-100 p-2">
                    <span className="text-sm font-medium">JS</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Jane Smith</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Verified Customer</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-4 rounded-lg border bg-background p-6">
                <div className="space-y-2">
                  <div className="flex space-x-1">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <Star className="h-5 w-5 fill-primary text-primary" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    Excellent customer service and competitive prices!
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-gray-100 p-2">
                    <span className="text-sm font-medium">RJ</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Robert Johnson</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Verified Customer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to Start Your Journey?
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Book your car today and experience the freedom of the open road
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/cars">
                  <Button size="lg">Browse Cars</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
