import { CollectionConfig } from 'payload'

export const Cars: CollectionConfig = {
  slug: 'cars',
  admin: {
    useAsTitle: `model`,
    hideAPIURL: true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'make',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'model',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'transmission',
          type: 'select',
          options: [
            { label: 'Automatic', value: 'automatic' },
            { label: 'Manual', value: 'manual' },
          ],
          required: true,
        },
        {
          name: 'fuelType',
          type: 'select',
          options: [
            { label: 'Gasoline', value: 'gasoline' },
            { label: 'Diesel', value: 'diesel' },
            { label: 'Electric', value: 'electric' },
            { label: 'Hybrid', value: 'hybrid' },
          ],
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'year',
          type: 'number',
          required: true,
        },
        {
          name: 'seats',
          type: 'number',
          required: true,
        },
        {
          name: 'doors',
          type: 'number',
          required: true,
        },
      ],
    },

    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'dailyRate',
          type: 'number',
          required: true,
        },
        {
          name: 'location',
          type: 'text',
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'available',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'mileage',
          type: 'number',
        },
        {
          name: 'licensePlate',
          type: 'text',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'images',
          type: 'array',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
        {
          name: 'Features',
          type: 'array',
          fields: [
            {
              name: 'Feature',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
