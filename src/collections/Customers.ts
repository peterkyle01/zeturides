import { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
  slug: 'customers',
  auth: {
    verify: false,
  },
  admin: {
    useAsTitle: 'email',
    hideAPIURL: true,
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'idNumber',
      type: 'number',
    },
    {
      name: 'phoneNumber',
      type: 'text',
    },
    {
      name: 'address',
      type: 'text',
    },
    {
      name: 'licenseNumber',
      type: 'text',
    },
    {
      name: 'licenseExpiryDate',
      type: 'date',
    },
  ],
}
