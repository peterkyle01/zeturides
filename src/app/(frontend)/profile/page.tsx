import { format } from 'date-fns'
import {
  AlertCircle,
  BadgeCheck,
  Building,
  Calendar,
  Contact,
  FileKey,
  Mail,
  Phone,
  User as UserIcon,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { getUser } from '@/app/server-actions/customers'
import EditProfile from '@/components/user-defined/edit-profile'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const customer = await getUser()
  if (!customer) redirect('/')
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  const isLicenseValid = customer.licenseExpiryDate
    ? new Date(customer.licenseExpiryDate) > new Date()
    : false

  const requiredFields = [
    { name: 'ID Number', value: customer.idNumber },
    { name: 'Phone Number', value: customer.phoneNumber },
    { name: 'Address', value: customer.address },
    { name: 'License Number', value: customer.licenseNumber },
    { name: 'License Expiry Date', value: customer.licenseExpiryDate },
  ]

  const completedFields = requiredFields.filter((field) => field.value != null).length
  const completionPercentage = (completedFields / requiredFields.length) * 100
  const missingFields = requiredFields.filter((field) => field.value == null)

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="grid gap-6">
        {/* Header Card */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-500 to-purple-500 opacity-90" />
          <CardContent className="pt-36 pb-8">
            <div className="absolute top-12 left-8 flex items-end gap-6">
              <Avatar className="h-20 w-20 border-4 border-background">
                <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                  {getInitials(customer.firstName, customer.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className="mb-1">
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                  {customer.firstName} {customer.lastName}
                  {customer.isValid ? (
                    <BadgeCheck className="h-5 w-5 text-blue-300" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-300" />
                  )}
                </h1>
                <p className="text-blue-100">
                  Member since {format(new Date(customer.createdAt), 'MMMM yyyy')}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs md:text-sm italic text-neutral-600">
                Profile Status:&nbsp;
                <span
                  className={`font-bold px-2 py-1 not-italic rounded-full ${
                    customer.isValid
                      ? ' bg-blue-500/10 text-green-500 '
                      : 'bg-rose-500/10 text-rose-500'
                  }`}
                >
                  {customer.isValid ? 'Approved' : 'Pending Approval'}
                </span>
              </p>
              <EditProfile customer={customer} />
            </div>
          </CardContent>
        </Card>

        {/* Profile Completion Status */}
        {!customer.idNumber && !customer.licenseExpiryDate && !customer.licenseNumber && (
          <Alert
            variant="destructive"
            className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span>Profile Completion</span>
                <span className="font-medium">{Math.round(completionPercentage)}%</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
              <div className="text-sm">
                Missing information: {missingFields.map((field) => field.name).join(', ')}
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{customer.email}</span>
              </div>
              {customer.phoneNumber && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{customer.phoneNumber}</span>
                </div>
              )}
              {customer.address && (
                <div className="flex items-center gap-3">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>{customer.address}</span>
                </div>
              )}
              {customer.idNumber && (
                <div className="flex items-center gap-3">
                  <Contact className="h-4 w-4 text-muted-foreground" />
                  <span>ID: {customer.idNumber}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* License Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileKey className="h-5 w-5" />
                License Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {customer.licenseNumber ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">License Status</span>
                    <Badge variant={isLicenseValid ? 'default' : 'destructive'}>
                      {isLicenseValid ? 'Valid' : 'Expired'}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">License Number</p>
                      <p className="font-medium">{customer.licenseNumber}</p>
                    </div>
                    {customer.licenseExpiryDate && (
                      <div>
                        <p className="text-sm text-muted-foreground">Expiry Date</p>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            {format(new Date(customer.licenseExpiryDate), 'PP')}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No license information available
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
