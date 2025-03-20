import { clsx, type ClassValue } from 'clsx'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

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
