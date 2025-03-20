import { CollectionConfig } from 'payload'

export const Leases: CollectionConfig = {
  slug: 'leases',
  admin: {
    useAsTitle: 'leaseId',
    hideAPIURL: true,
  },
  fields: [
    {
      name: 'leaseId',
      type: 'text',
      unique: true,
      required: true,
    },
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
    {
      name: 'leaseType',
      type: 'select',
      options: [
        { label: 'Daily', value: 'daily' },
        { label: 'Monthly', value: 'monthly' },
      ],
      required: true,
    },
    {
      name: 'totalAmount',
      type: 'number',
      required: true,
    },
    {
      name: 'paymentStatus',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Refunded', value: 'refunded' },
      ],
      required: true,
    },
    {
      name: 'pickupLocation',
      type: 'text',
    },
    {
      name: 'returnLocation',
      type: 'text',
    },
    {
      name: 'notes',
      type: 'richText',
    },
  ],
}

export default Leases
