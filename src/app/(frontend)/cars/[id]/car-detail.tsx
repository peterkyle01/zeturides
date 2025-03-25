'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  Calendar,
  CarIcon,
  Check,
  ChevronRight,
  Fuel,
  MapPin,
  Share2,
  Shield,
  Star,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import type { Car, Customer, Lease } from '@/payload-types'
import { copyTextToClipboard } from '@/lib/utils'
import RentComponent from '@/components/user-defined/rent-component'
import { LeaseComponent } from '@/components/user-defined/lease-component'

export default function CarDetails({
  car,
  user,
  lease = null,
}: {
  car: Car
  user: Customer
  lease?: Lease | null
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  if (!car) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <CarIcon className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Car Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The car youre looking for doesnt exist or has been removed.
        </p>
        <Button onClick={() => router.push('/cars')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cars
        </Button>
      </div>
    )
  }

  const features = [
    { icon: <Users className="h-5 w-5" />, label: `${car.seats} Seats` },
    { icon: <CarIcon className="h-5 w-5" />, label: `${car.doors} Doors` },
    {
      icon: <Fuel className="h-5 w-5" />,
      label: car.fuelType.charAt(0).toUpperCase() + car.fuelType.slice(1),
    },
    { icon: <Calendar className="h-5 w-5" />, label: `${car.year}` },
  ]
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-8 mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <Link href="/cars" className="hover:text-foreground transition-colors">
            Cars
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="font-medium text-foreground">
            {car.make} {car.model}
          </span>
        </div>

        {/* Back button */}
        <div className="mb-6">
          <Button variant="outline" size="sm" onClick={() => router.push('/cars')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cars
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Images and details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Car title for mobile */}
            <div className="lg:hidden">
              <h1 className="text-3xl font-bold">
                {car.make} {car.model} {car.year}
              </h1>
              <div className="flex items-center mt-2">
                <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                <span className="text-muted-foreground">{car.location}</span>
              </div>
            </div>

            {/* Main image */}
            <div className="relative rounded-lg overflow-hidden border">
              <div className="aspect-[16/9]">
                <Image
                  // @ts-expect-error err
                  src={car.images[selectedImageIndex]?.image?.url || '/placeholder.svg'}
                  // @ts-expect-error err
                  alt={car.images[selectedImageIndex]?.image?.alt || `${car.make} ${car.model}`}
                  fill
                  className="object-cover"
                />
              </div>
              {!car.available && (
                <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-md font-medium">
                  Not Available
                </div>
              )}
            </div>

            {/* Thumbnail images */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {car?.images?.map((image, index) => (
                <button
                  key={index}
                  className={`relative rounded-md overflow-hidden border ${
                    selectedImageIndex === index ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <div className="w-20 h-20">
                    <Image
                      // @ts-expect-error url
                      src={image.image?.url || '/placeholder.svg'}
                      // @ts-expect-error url
                      alt={image.image?.alt || `${car.make} ${car.model} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>

            {/* Car details for desktop */}
            <div className="hidden lg:block">
              <h1 className="text-3xl font-bold">
                {car.make} {car.model} {car.year}
              </h1>
              <div className="flex items-center mt-2">
                <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                <span className="text-muted-foreground">{car.location}</span>
                <span className="mx-2">•</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                  <span className="text-muted-foreground">4.8 (24 reviews)</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg"
                >
                  {feature.icon}
                  <span className="mt-2 text-sm font-medium">{feature.label}</span>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="description" className="mt-8">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="space-y-4">
                <h3 className="text-xl font-semibold">About this car</h3>
                <p className="text-neutral-600">{car.description}</p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Make</span>
                      <span className="font-medium">{car.make}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Model</span>
                      <span className="font-medium">{car.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Year</span>
                      <span className="font-medium">{car.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category</span>
                      <span className="font-medium">
                        {typeof car.categories !== 'number' && car.categories.name}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Transmission</span>
                      <span className="font-medium">
                        {car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fuel Type</span>
                      <span className="font-medium">
                        {car.fuelType.charAt(0).toUpperCase() + car.fuelType.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mileage</span>
                      <span className="font-medium">{car.mileage} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">License Plate</span>
                      <span className="font-medium">{car?.licensePlate}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="features" className="space-y-4">
                <h3 className="text-xl font-semibold">Car Features</h3>
                <div className="grid grid-cols-2 gap-y-2">
                  {car.Features?.map((feature) => (
                    <div key={feature.id} className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>{feature.Feature}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Customer Reviews</h3>
                  <Badge variant="outline" className="flex items-center">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 mr-1" />
                    4.8
                  </Badge>
                </div>
                <p className="text-muted-foreground">Reviews will be displayed here.</p>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right column - Booking and info */}
          <div className="space-y-6">
            <div className="bg-background rounded-lg border p-6 sticky top-18">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-2xl font-bold">KSh {car.dailyRate.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">per day</div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    copyTextToClipboard(window.location.origin + window.location.pathname)
                  }
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly rate</span>
                  <span className="font-medium">KSh {car.dailyRate * 30}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Security deposit</span>
                  <span className="font-medium">KSh {0.2 * car.dailyRate * 30}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                {user ? (
                  user.licenseNumber && user.idNumber ? (
                    !user.isValid ? (
                      <Link href={'/profile'}>
                        <Button className="w-full my-2">Profile Verification</Button>
                      </Link>
                    ) : lease &&
                      lease?.paymentStatus !== 'cancelled' &&
                      lease?.paymentStatus !== 'refunded' ? (
                      <LeaseComponent lease={lease!} />
                    ) : (
                      <RentComponent car={car} />
                    )
                  ) : (
                    <Link href={'/profile'}>
                      <Button className="w-full my-2">Add ID or License</Button>
                    </Link>
                  )
                ) : (
                  <Button
                    className="w-full my-2"
                    onClick={() => router.push(`/sign-in?from=${encodeURIComponent(pathname)}`)}
                  >
                    Sign In
                  </Button>
                )}
                <Button variant="outline" className="w-full">
                  Request Information
                </Button>
              </div>

              <div className="mt-6 flex items-center text-sm text-muted-foreground">
                <Shield className="h-4 w-4 mr-2" />
                Free cancellation up to 24 hours before pickup
              </div>
            </div>

            <div className="bg-background rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">Rental Policies</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Minimum rental period</span>
                  <span>1 day</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Maximum rental period</span>
                  <span>30 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Minimum age</span>
                  <span>21 years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Required documents</span>
                  <span>ID, Drivers License</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
