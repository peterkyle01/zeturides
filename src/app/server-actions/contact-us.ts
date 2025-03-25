'use server'

import { contactFormSchema, ContactFormValues } from '@/lib/form-schemas'
import { handleError } from '@/lib/utils'
import config from '@/payload.config'
import { getPayload } from 'payload'

export async function postContactUs(formData: ContactFormValues) {
  const validatedData = contactFormSchema.parse(formData)
  const payload = await getPayload({ config })
  try {
    await payload.create({
      collection: 'contact-us',
      data: validatedData,
    })
  } catch (error) {
    return handleError(error, 'Failed to Send!')
  }
}
