import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, Car, CheckCircle, ChevronRight, Clock, MapPin, Star } from 'lucide-react'
import Link from 'next/link'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { docs: category } = await payload.find({
    collection: 'cars',
    select: {
      category: true,
    },
  })

  return (
    <div className="flex min-h-screen flex-col w-full">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Rent Your Perfect Car with Zeturides
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Discover the freedom of the road with our premium car rental service. Easy
                    booking, competitive rates, and exceptional service.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/cars">
                    <Button size="lg" className="h-12">
                      View Cars
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="h-12">
                    Contact Us
                  </Button>
                </div>
              </div>
              <div className="mx-auto w-full max-w-[500px] lg:max-w-none">
                <div className="bg-background rounded-xl border shadow-lg p-6">
                  <Tabs defaultValue="rental" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="rental">Car Rental</TabsTrigger>
                      <TabsTrigger value="airport">Airport Transfer</TabsTrigger>
                    </TabsList>
                    <TabsContent value="rental" className="space-y-4">
                      <div className="grid gap-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Pick-up Location
                            </label>
                            <div className="relative">
                              <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-8" placeholder="City, Airport, or Address" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Drop-off Location
                            </label>
                            <div className="relative">
                              <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-8" placeholder="City, Airport, or Address" />
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Pick-up Date</label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  <span>Pick a date</span>
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">
                              Drop-off Date
                            </label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  <span>Pick a date</span>
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                        <Button size="lg" className="w-full">
                          Search Available Cars
                        </Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="airport" className="space-y-4">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Airport
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-8" placeholder="Airport Name or Code" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Destination
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-8" placeholder="Hotel, Address" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Date</label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  <span>Pick a date</span>
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Passengers</label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1 Passenger</SelectItem>
                                <SelectItem value="2">2 Passengers</SelectItem>
                                <SelectItem value="3">3 Passengers</SelectItem>
                                <SelectItem value="4">4 Passengers</SelectItem>
                                <SelectItem value="5">5+ Passengers</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <Button size="lg" className="w-full">
                          Book Transfer
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Why Choose Zeturides
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  The Best Car Rental Experience
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We offer a wide range of vehicles for all your driving needs. We have the perfect
                  car to meet your needs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="grid gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto">
                  <Car className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Wide Selection</h3>
                <p className="text-muted-foreground">
                  Choose from a variety of cars, from economy to luxury, SUVs to convertibles.
                </p>
              </div>
              <div className="grid gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">24/7 Support</h3>
                <p className="text-muted-foreground">
                  Our customer service team is available around the clock to assist you.
                </p>
              </div>
              <div className="grid gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Quality Guaranteed</h3>
                <p className="text-muted-foreground">
                  All our vehicles are regularly serviced and maintained to ensure your safety.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Popular Car Categories
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find the perfect vehicle for your next adventure
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              {category.map((car) => (
                <div
                  key={car.id}
                  className="group relative overflow-hidden rounded-lg border bg-background shadow-md transition-all hover:shadow-lg"
                >
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=200&width=400"
                      width={400}
                      height={200}
                      alt="Economy Car"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold capitalize">{car.category}</h3>
                    <p className="text-sm text-muted-foreground">
                      Fuel-efficient and budget-friendly options
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        From <span className="text-lg font-bold text-foreground">$25</span>/day
                      </div>
                      <Button variant="outline" size="sm">
                        View Cars
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button size="lg" className="gap-2">
                View All Categories
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  How It Works
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Renting a car with Zeturides is quick and easy
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 md:grid-cols-3">
              <div className="grid gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mx-auto">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold">Choose Your Car</h3>
                <p className="text-muted-foreground">
                  Browse our selection and find the perfect vehicle for your needs.
                </p>
              </div>
              <div className="grid gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mx-auto">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold">Book & Confirm</h3>
                <p className="text-muted-foreground">
                  Complete your booking online in minutes with instant confirmation.
                </p>
              </div>
              <div className="grid gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mx-auto">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold">Enjoy Your Ride</h3>
                <p className="text-muted-foreground">
                  Pick up your car and enjoy the freedom of the open road.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  What Our Customers Say
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Dont just take our word for it - hear from our satisfied customers
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <Star className="h-4 w-4 fill-primary text-primary" />
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      The car was in perfect condition and the service was excellent. Will
                      definitely use Zeturides again!
                    </p>
                    <div className="font-medium">- Sarah Johnson</div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <Star className="h-4 w-4 fill-primary text-primary" />
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Quick and easy booking process. The car was clean and fuel-efficient. Great
                      experience overall!
                    </p>
                    <div className="font-medium">- Michael Chen</div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <Star className="h-4 w-4 fill-primary text-primary" />
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Fantastic customer service! They helped me choose the perfect car for my
                      family vacation.
                    </p>
                    <div className="font-medium">- Emily Rodriguez</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Ready to hit the road?
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Start your journey with Zeturides today
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                  Join thousands of satisfied customers who choose Zeturides for their car rental
                  needs.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="h-12">
                    Lease Now
                  </Button>
                  <Button size="lg" variant="outline" className="h-12">
                    Contact Us
                  </Button>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Download Our App
                </div>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  Get the Zeturides app for even faster bookings, exclusive mobile deals, and easy
                  management of your rentals.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button variant="outline" className="h-12 gap-2">
                    <Image
                      src="/placeholder.svg?height=24&width=24"
                      width={24}
                      height={24}
                      alt="App Store"
                    />
                    App Store
                  </Button>
                  <Button variant="outline" className="h-12 gap-2">
                    <Image
                      src="/placeholder.svg?height=24&width=24"
                      width={24}
                      height={24}
                      alt="Google Play"
                    />
                    Google Play
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
