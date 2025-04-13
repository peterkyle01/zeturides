import { CollectionConfig } from 'payload'

export const ContactUs: CollectionConfig = {
  slug: 'contact-us',
  auth: {
    useAPIKey: true,
  },
  labels: {
    singular: 'Contact Message',
    plural: 'Contact Messages',
  },
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => false,
  },
  fields: [
    {
      name: 'fullname',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Resolved', value: 'resolved' },
      ],
      defaultValue: 'pending',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
