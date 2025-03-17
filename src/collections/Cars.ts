import { CollectionConfig } from 'payload'

export const Cars: CollectionConfig = {
  slug: 'cars',
  admin: {
    useAsTitle: 'model',
  },
  fields: [
    {
      name: 'model',
      type: 'text',
      required: true,
    },
    {
      name: 'make',
      type: 'text',
      required: true,
    },
    {
      name: 'year',
      type: 'number',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Sedan', value: 'sedan' },
        { label: 'SUV', value: 'suv' },
        { label: 'Hatchback', value: 'hatchback' },
        { label: 'Truck', value: 'truck' },
        { label: 'Van', value: 'van' },
        { label: 'Economy', value: 'economy' },
      ],
      required: true,
    },
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
    {
      name: 'dailyRate',
      type: 'number',
      required: true,
    },
    {
      name: 'monthlyRate',
      type: 'number',
      required: true,
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
      name: 'description',
      type: 'richText',
    },
    {
      name: 'availability',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'mileage',
      type: 'number',
    },
    {
      name: 'licensePlate',
      type: 'text',
    },
  ],
}
