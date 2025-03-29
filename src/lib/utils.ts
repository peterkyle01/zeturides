import { Review } from '@/payload-types'
import { clsx, type ClassValue } from 'clsx'
import { toast } from 'react-toastify'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const copyTextToClipboard = async (textToCopy: string) => {
  if (!navigator.clipboard) {
    toast.warning('Clipboard API not available in this browser.')
    return
  }
  try {
    await navigator.clipboard.writeText(textToCopy)
    toast.success('Link Copied!')
  } catch (err) {
    // @ts-expect-error err
    toast.error(`Failed to copy:${err?.message || 'Unknown Error'}`)
  }
}
export function handleError(error: unknown, defaultMessage: string) {
  if (error instanceof z.ZodError) {
    return {
      error: 'Validation failed',
      details: error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      })),
    }
  }
  console.error(defaultMessage, error)
  return {
    error: defaultMessage,
    details: error instanceof Error ? error.message : 'Unknown error',
  }
}

export function getDaysDifference(startDate: Date, endDate: Date) {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const differenceInTime = end.getTime() - start.getTime()
  return differenceInTime / (1000 * 60 * 60 * 24)
}

export const APP_ENV: 'LOCAL' | 'PROD' = process.env.APP_ENV as 'LOCAL' | 'PROD'

export function processReviewRatings(reviews: Review[]) {
  return reviews
    .map((review: Review) => {
      const ratingMapping = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
      }
      // @ts-expect-error err
      const numericalRating = ratingMapping[review.rating?.toLowerCase()] || null
      return { ...review, rating: numericalRating }
    })
    .filter((review: Review) => review.rating !== null) // Filter out reviews with null ratings
}

export function calculateAverageRating(reviews: Review[]) {
  const validRatings = reviews
    .map((review) => {
      const ratingMapping = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
      }
      // @ts-expect-error err
      return ratingMapping[review.rating?.toLowerCase()]
    })
    .filter((rating) => rating !== undefined)

  if (validRatings.length === 0) {
    return '0.0' // Return "0.0" as a string
  }

  const sum = validRatings.reduce((total, rating) => total + rating, 0)
  const average = sum / validRatings.length

  if (Number.isInteger(average)) {
    return average.toFixed(1) // Ensure 1 decimal place if it is an integer.
  } else {
    return average.toString() // Return as string to avoid truncation
  }
}

export function timeAgo(createdAt: string) {
  const now = new Date()
  const created = new Date(createdAt)
  // @ts-expect-error no-type
  const seconds = Math.round((now - created) / 1000)

  if (isNaN(seconds)) {
    return 'Invalid date' // Handle invalid date inputs
  }

  if (seconds < 60) {
    return seconds + ' second' + (seconds === 1 ? ' ago' : 's ago')
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60)
    return minutes + ' minute' + (minutes === 1 ? ' ago' : 's ago')
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600)
    return hours + ' hour' + (hours === 1 ? ' ago' : 's ago')
  } else if (seconds < 2592000) {
    // 30 days
    const days = Math.floor(seconds / 86400)
    return days + ' day' + (days === 1 ? ' ago' : 's ago')
  } else if (seconds < 31536000) {
    // 365 days
    const months = Math.floor(seconds / 2592000)
    return months + ' month' + (months === 1 ? ' ago' : 's ago')
  } else {
    const years = Math.floor(seconds / 31536000)
    return years + ' year' + (years === 1 ? ' ago' : 's ago')
  }
}

export function getRatingIndex(value: string) {
  if (value === 'one') return 1
  if (value === 'two') return 2
  if (value === 'three') return 3
  if (value === 'four') return 4
  if (value === 'five') return 5
  return 0
}
