'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Car,
  ChevronDown,
  ChevronUp,
  Filter,
  GripVertical,
  List,
  MapPin,
  Search,
  SlidersHorizontal,
  Users,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Category, Car as TCar } from '@/payload-types'

const getFuelTypeIcon = (fuelType: string) => {
  switch (fuelType) {
    case 'electric':
      return '⚡'
    case 'hybrid':
      return '⚡/⛽'
    case 'diesel':
      return '🛢️'
    default:
      return '⛽'
  }
}

export default function CarsComponent({
  mockCars,
  categories,
}: {
  mockCars: TCar[]
  categories: Category[]
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filterOpen, setFilterOpen] = useState(true)
  const [filters, setFilters] = useState({
    category: '',
    transmission: '',
    fuelType: '',
    minPrice: 1000,
    maxPrice: 50000,
    availableOnly: false,
  })
  const [sortBy, setSortBy] = useState('price-asc')

  // Filter cars based on selected filters
  const filteredCars = mockCars.filter((car) => {
    // Search term filter
    if (
      searchTerm &&
      !`${car.make} ${car.model} ${car.year}`.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    // Category filter
    if (filters.category && typeof car.categories !== filters.category) {
      return false
    }

    // Transmission filter
    if (filters.transmission && car.transmission !== filters.transmission) {
      return false
    }

    // Fuel type filter
    if (filters.fuelType && car.fuelType !== filters.fuelType) {
      return false
    }

    // Price filter
    if (car.dailyRate < filters.minPrice || car.dailyRate > filters.maxPrice) {
      return false
    }

    // Availability filter
    if (filters.availableOnly && !car.available) {
      return false
    }

    return true
  })

  // Sort cars based on selected sort option
  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.dailyRate - b.dailyRate
      case 'price-desc':
        return b.dailyRate - a.dailyRate
      case 'year-desc':
        return b.year - a.year
      case 'year-asc':
        return a.year - b.year
      default:
        return 0
    }
  })

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      category: '',
      transmission: '',
      fuelType: '',
      minPrice: 1000,
      maxPrice: 10000,
      availableOnly: false,
    })
    setSearchTerm('')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="bg-muted py-8">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Our Fleet
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Browse our selection of quality vehicles and find the perfect car for your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by make, model, or year..."
                    className="pl-8 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button>Search</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="py-8">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              <div
                className={cn(
                  'lg:w-1/4 bg-background rounded-lg border p-4 space-y-4',
                  filterOpen ? 'block' : 'hidden lg:block',
                )}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters
                  </h2>
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    Reset
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select
                      value={filters.category}
                      onValueChange={(value) => setFilters({ ...filters, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Transmission</label>
                    <Select
                      value={filters.transmission}
                      onValueChange={(value) => setFilters({ ...filters, transmission: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Transmissions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Transmissions</SelectItem>
                        <SelectItem value="automatic">Automatic</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Fuel Type</label>
                    <Select
                      value={filters.fuelType}
                      onValueChange={(value) => setFilters({ ...filters, fuelType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Fuel Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Fuel Types</SelectItem>
                        <SelectItem value="gasoline">Gasoline</SelectItem>
                        <SelectItem value="diesel">Diesel</SelectItem>
                        <SelectItem value="electric">Electric</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Daily Price Range</label>
                      <span className="text-sm text-muted-foreground">
                        KSh {filters.minPrice.toLocaleString()} - KSh{' '}
                        {filters.maxPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="pt-2">
                      <Slider
                        defaultValue={[filters.minPrice, filters.maxPrice]}
                        min={1000}
                        max={10000}
                        step={500}
                        onValueChange={(value) =>
                          setFilters({
                            ...filters,
                            minPrice: value[0],
                            maxPrice: value[1],
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="availableOnly"
                      checked={filters.availableOnly}
                      onCheckedChange={(checked) =>
                        setFilters({
                          ...filters,
                          availableOnly: checked as boolean,
                        })
                      }
                    />
                    <label
                      htmlFor="availableOnly"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Show available cars only
                    </label>
                  </div>
                </div>
              </div>
              {/* Car Listings */}
              <div className="lg:w-3/4 space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden flex items-center gap-2"
                    onClick={() => setFilterOpen(!filterOpen)}
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    {filterOpen ? 'Hide Filters' : 'Show Filters'}
                  </Button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {sortedCars.length} cars found
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="price-asc">Price: Low to High</SelectItem>
                          <SelectItem value="price-desc">Price: High to Low</SelectItem>
                          <SelectItem value="year-desc">Year: Newest First</SelectItem>
                          <SelectItem value="year-asc">Year: Oldest First</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn('rounded-none', viewMode === 'grid' && 'bg-muted')}
                        onClick={() => setViewMode('grid')}
                      >
                        <GripVertical className="h-4 w-4" />
                        <span className="sr-only">Grid view</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn('rounded-none', viewMode === 'list' && 'bg-muted')}
                        onClick={() => setViewMode('list')}
                      >
                        <List className="h-4 w-4" />
                        <span className="sr-only">List view</span>
                      </Button>
                    </div>
                  </div>
                </div>

                {sortedCars.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Car className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-bold">No cars found</h3>
                    <p className="text-muted-foreground mt-2">
                      Try adjusting your filters or search criteria
                    </p>
                    <Button variant="outline" className="mt-4" onClick={resetFilters}>
                      Reset Filters
                    </Button>
                  </div>
                ) : viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedCars.map((car) => (
                      <div
                        key={car.id}
                        className="group relative overflow-hidden rounded-lg border bg-background shadow-md transition-all hover:shadow-lg"
                      >
                        <div className="relative">
                          <div className="aspect-[4/3] overflow-hidden">
                            <Image
                              // @ts-expect-error err
                              src={car?.images[0]?.image?.url || '/placeholder.svg'}
                              width={500}
                              height={300}
                              alt={`${car.make} ${car.model}`}
                              className="object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                          {!car.available && (
                            <div className="absolute top-0 rounded-bl-md right-0 bg-destructive text-destructive-foreground px-2 py-1 text-xs font-medium">
                              Not Available
                            </div>
                          )}
                          <div className="absolute top-0 left-0 bg-primary text-primary-foreground px-2 py-1 text-xs font-medium">
                            {typeof car.categories !== 'number' && car.categories.name}
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <h3 className="text-lg font-bold">
                              {car.make} {car.model}
                            </h3>
                            <span className="text-sm">{car.year}</span>
                          </div>
                          <div className="mb-4 flex flex-wrap gap-2">
                            <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium">
                              {car.transmission === 'automatic' ? 'Auto' : 'Manual'}
                            </span>
                            <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium">
                              {getFuelTypeIcon(car.fuelType)}{' '}
                              {car.fuelType.charAt(0).toUpperCase() + car.fuelType.slice(1)}
                            </span>
                            <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium">
                              <Users className="mr-1 h-3 w-3" /> {car.seats} seats
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="mr-1 h-3 w-3" />
                              {car.location}
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold">
                                KSh {car.dailyRate.toLocaleString()}
                                <span className="text-xs font-normal text-muted-foreground">
                                  &nbsp;per day
                                </span>
                              </div>
                            </div>
                          </div>
                          <Link href={`/cars/${car.id}`} className="w-full mt-4">
                            <Button className="w-full">View Details</Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sortedCars.map((car) => (
                      <div
                        key={car.id}
                        className="flex flex-col sm:flex-row gap-4 rounded-lg border bg-background p-4 shadow-sm"
                      >
                        <div className="sm:w-1/3 relative">
                          <div className="aspect-[4/3] sm:aspect-square overflow-hidden rounded-md">
                            <Image
                              // @ts-expect-error err
                              src={car.images[0]?.image?.url || '/placeholder.svg'}
                              width={300}
                              height={300}
                              alt={`${car.make} ${car.model}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          {!car.available && (
                            <div className="absolute top-0 right-0 bg-destructive text-destructive-foreground px-2 py-1 text-xs font-medium">
                              Not Available
                            </div>
                          )}
                          <div className="absolute top-0 left-0 bg-primary text-primary-foreground px-2 py-1 text-xs font-medium">
                            {typeof car.categories !== 'number' && car.categories.name}
                          </div>
                        </div>
                        <div className="sm:w-2/3 flex flex-col">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                            <h3 className="text-xl font-bold">
                              {car.make} {car.model} ({car.year})
                            </h3>
                            <div className="text-right">
                              <div className="text-xl font-bold">
                                KSh {car.dailyRate.toLocaleString()}
                              </div>
                              <div className="text-xs text-muted-foreground">per day</div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {car.licensePlate}
                          </p>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                            <div className="flex flex-col">
                              <span className="text-xs text-muted-foreground">Transmission</span>
                              <span className="text-sm font-medium">
                                {car.transmission === 'automatic' ? 'Automatic' : 'Manual'}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs text-muted-foreground">Fuel Type</span>
                              <span className="text-sm font-medium">
                                {car.fuelType.charAt(0).toUpperCase() + car.fuelType.slice(1)}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs text-muted-foreground">Seats</span>
                              <span className="text-sm font-medium">{car.seats}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs text-muted-foreground">Doors</span>
                              <span className="text-sm font-medium">{car.doors}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="mr-1 h-3 w-3" />
                              {car.location}
                            </div>
                            <Link href={`/cars/${car.id}`}>
                              <Button>View Details</Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                <div className="flex items-center justify-center space-x-2 py-4">
                  <Button variant="outline" size="icon" disabled>
                    <ChevronUp className="h-4 w-4 rotate-90" />
                    <span className="sr-only">Previous</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 font-medium bg-primary text-primary-foreground"
                  >
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 font-medium">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 font-medium">
                    3
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronDown className="h-4 w-4 rotate-90" />
                    <span className="sr-only">Next</span>
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
