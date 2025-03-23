'use client'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { signOutUser } from '@/app/server-actions/customers'
import { Customer } from '@/payload-types'
import Image from 'next/image'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { AlignJustify } from 'lucide-react'
import Link from 'next/link'

export default function LogoutBtn(user: Customer) {
  const router = useRouter()
  const onLogOut = async () => {
    await signOutUser()
    router.refresh()
  }
  console.log(user)
  return (
    <>
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-brown text-black font-bold text-lg">
        {user.firstName.charAt(0).toUpperCase() + '.' + user.lastName.charAt(0).toUpperCase()}
      </div>
      <Button size={'sm'} onClick={onLogOut}>
        Log Out
      </Button>
      <Sheet>
        <SheetTrigger asChild>
          <AlignJustify className="md:hidden" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 px-4">
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
          </div>
          <SheetFooter className="w-full border-t py-6 md:py-0 px-4">
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
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}
