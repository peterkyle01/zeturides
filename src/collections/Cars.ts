import { CollectionConfig } from 'payload'

export const Cars: CollectionConfig = {
  slug: 'cars',
  admin: {
    useAsTitle: `model`,
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
          defaultValue: 'automatic',
          options: [
            { label: 'Automatic', value: 'automatic' },
            { label: 'Manual', value: 'manual' },
          ],
          required: true,
        },
        {
          name: 'fuelType',
          type: 'select',
          defaultValue: 'gasoline',
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
          defaultValue: 5,
        },
        {
          name: 'doors',
          type: 'number',
          required: true,
          defaultValue: 4,
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
      admin: {
        description: 'If car is available to be leased',
      },
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
}
