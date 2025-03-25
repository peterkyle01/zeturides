import React from 'react'
import './global.css'
import Link from 'next/link'
import { Flip, ToastContainer } from 'react-toastify'
import Image from 'next/image'
import { getUser } from '../server-actions/customers'
import LogoutBtn from '@/components/user-defined/logout-btn'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Zeturides',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const user = await getUser()
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-5">
          <div className="container flex h-16 items-center justify-between px-4 ">
            <div className="flex items-center gap-2">
              <Link href="/" className="text-xl font-bold">
                <Image
                  src="/zeturides.png"
                  width={100}
                  height={50}
                  alt="zeturides_logo"
                  className="invert"
                />
              </Link>
            </div>
            <nav className="hidden md:flex gap-6">
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Home
              </Link>
              <Link
                href="/cars"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Cars
              </Link>
              {user && (
                <>
                  <Link
                    href="/orders"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    Orders
                  </Link>
                  <Link
                    href="/profile"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    Profile
                  </Link>
                </>
              )}
              <Link
                href="#"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Contact
              </Link>
            </nav>

            {user ? (
              <LogoutBtn {...user} />
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/sign-in" className="text-sm font-medium">
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </header>
        <main className="container mx-auto">{children}</main>
        <footer className="w-full border-t py-6 md:py-0 px-4">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <div className="flex  items-center gap-2">
              <Image
                src="/zeturides.png"
                width={100}
                height={50}
                alt="zeturides_logo"
                className="invert"
              />
            </div>
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © {new Date().getFullYear()} Zeturides. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Contact
              </Link>
            </div>
          </div>
        </footer>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Flip}
        />
      </body>
    </html>
  )
}
