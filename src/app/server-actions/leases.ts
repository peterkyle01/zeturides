'use server'
import { z } from 'zod'

import config from '@/payload.config'
import { getPayload } from 'payload'
import { handleError } from '@/lib/utils'
import { getUser } from './customers'
import { CreateLeaseFormData, createLeaseSchema } from '@/lib/form-schemas'

export async function createLease(formData: CreateLeaseFormData) {
  const user = getUser()
  const validatedData = createLeaseSchema.parse(formData)
  const payload = await getPayload({ config })
  try {
    console.log(validatedData)

    //await payload.create({ collection: 'leases', data: {} })
  } catch (error) {
    return handleError(error, 'Failed To Rent')
  }
}
