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
        <div className="rounded-full bg-gray-200 p-2 border ">
          <span className="text-sm font-bold">
            {user.firstName.charAt(0).toUpperCase() + '.' + user.lastName.charAt(0).toUpperCase()}
          </span>
        </div>
      ) : (
        <p className="text-xs md:text-base font-bold">ADMIN</p>
      )}
      <Button size={'sm'} onClick={onLogOut}>
        Log Out
      </Button>
    </>
  )
}
