import type { CollectionAfterChangeHook } from 'payload'

export const updateCarAvailability: CollectionAfterChangeHook = async ({ doc, req }) => {
  try {
    const carId = doc.car

    if (carId) {
      await req.payload.update({
        req,
        collection: 'cars',
        id: carId,
        data: {
          available: false,
        },
      })
    }
  } catch (error) {
    console.error('Error updating car availability:', error)
  }
  return doc
}
