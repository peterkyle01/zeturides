import { getAllUserLeases } from '@/app/server-actions/leases'
import { Button } from '@/components/ui/button'
import OrderList from '@/components/user-defined/order-list'
import Link from 'next/link'

export default async function OrderPage() {
  const leases = await getAllUserLeases()

  if (!leases || leases.length === 0) {
    return (
      <div className="w-full h-fit">
        <div className="w-full h-96 flex justify-center items-center">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            No Orders Found!
          </h2>
        </div>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to Start Your Journey?
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Book your car today and experience the freedom of the open road
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/cars">
                  <Button size="lg">Browse Cars</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen px-2 md:px-0 max-w-6xl mx-auto">
      <OrderList leases={leases} />
    </div>
  )
}
