import React from 'react'
import './global.css'
import { Car } from 'lucide-react'
import Link from 'next/link'
import { Toaster } from 'sonner'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Zeturides',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Car className="h-6 w-6 text-primary" />
              <Link href="/" className="text-xl font-bold">
                Zeturides
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
              <Link
                href="#"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Locations
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                About
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Contact
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link href="/sign-in" className="text-sm font-medium">
                Sign In
              </Link>
            </div>
          </div>
        </header>
        <main className="container mx-auto">{children}</main>
        <footer className="w-full border-t py-6 md:py-0">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <div className="flex items-center gap-2">
              <Car className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Zeturides</span>
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
        <Toaster />
      </body>
    </html>
  )
}
