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
    toast.success('Copied!')
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
