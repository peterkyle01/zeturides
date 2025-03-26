'use client'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { signOutUser } from '@/app/server-actions/customers'
import { Customer } from '@/payload-types'

export default function LogoutBtn(user: Customer) {
  const router = useRouter()
  const onLogOut = async () => {
    await signOutUser()
    router.refresh()
  }
  return (
    <>
      {user.firstName ? (
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-brown text-black font-bold text-lg">
          {user.firstName.charAt(0).toUpperCase() + '.' + user.lastName.charAt(0).toUpperCase()}
        </div>
      ) : (
        <p className="text-sm font-bold">ADMIN</p>
      )}
      <Button size={'sm'} onClick={onLogOut}>
        Log Out
      </Button>
    </>
  )
}
