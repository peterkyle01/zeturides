import { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  labels: {
    singular: 'Car Review',
    plural: 'Car Reviews',
  },
  fields: [
    {
      name: 'author',
      type: 'relationship',
      label: 'Author',
      relationTo: 'customers',
      required: true,
      hasMany: false,
    },
    {
      name: 'rating',
      type: 'radio',
      label: 'Rating',
      required: true,
      options: [
        { label: '1 Star', value: 'one' },
        { label: '2 Stars', value: 'two' },
        { label: '3 Stars', value: 'three' },
        { label: '4 Stars', value: 'four' },
        { label: '5 Stars', value: 'five' },
      ],
    },
    {
      name: 'reviewText',
      type: 'textarea',
      label: 'Review Text',
      required: true,
    },
    {
      name: 'carRented',
      type: 'relationship',
      label: 'Car Rented',
      relationTo: 'cars',
      required: true,
      hasMany: false,
    },
    {
      name: 'approved',
      type: 'checkbox',
      label: 'Approved',
      defaultValue: false,
      admin: {
        description: 'Check to approve review for display on site.',
      },
    },
  ],
  admin: {
    useAsTitle: 'reviewText',
    defaultColumns: ['author', 'rating', 'carRented', 'rentalDate', 'approved'],
  },
}
