import { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
  slug: 'customers',
  auth: {
    verify: false,
  },
  admin: {
    useAsTitle: 'email',
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
      type: 'checkbox',
      name: 'isValid',
      admin: {
        description: 'If customer is approved!',
      },
    },
    {
      name: 'licenseExpiryDate',
      type: 'date',
    },
  ],
}
