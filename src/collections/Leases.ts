import { CollectionConfig } from 'payload'

export const Leases: CollectionConfig = {
  slug: 'leases',
  admin: {
    useAsTitle: 'car',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'customer',
          type: 'relationship',
          relationTo: 'customers',
          required: true,
        },
        {
          name: 'car',
          type: 'relationship',
          relationTo: 'cars',
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'startDate',
          type: 'date',
          required: true,
        },
        {
          name: 'endDate',
          type: 'date',
          required: true,
        },
      ],
    },
    {
      name: 'paymentStatus',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Refunded', value: 'refunded' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'pickupLocation',
          type: 'text',
        },
        {
          name: 'returnLocation',
          type: 'text',
        },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
    },
    {
      name: 'totalAmount',
      type: 'number',
      required: true,
    },
  ],
}

export default Leases
