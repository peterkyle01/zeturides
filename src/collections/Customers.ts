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
      type: 'row',
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
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'idNumber',
          type: 'number',
        },
        {
          name: 'licenseNumber',
          type: 'text',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phoneNumber',
          type: 'text',
        },
        {
          name: 'address',
          type: 'text',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          type: 'checkbox',
          name: 'isValid',
        },
        {
          name: 'licenseExpiryDate',
          type: 'date',
        },
      ],
    },
  ],
}
