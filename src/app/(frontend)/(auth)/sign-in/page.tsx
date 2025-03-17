import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SignIn() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid w-full max-w-md gap-6">
            <div className="flex flex-col text-center space-y-2">
              <h1 className="text-3xl font-bold">Sign In</h1>
              <p className="text-muted-foreground">
                Enter your email and password to access your account
              </p>
            </div>
            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="text-sm text-primary underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </Label>
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/sign-up" className="text-primary underline-offset-4 hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
