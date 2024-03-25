import { usePage } from '@inertiajs/react'
import { UserRole } from '#enums/user_role'
import BookingDate, { type BookingDateId } from '#models/booking_date'
import User from '#models/user'

import { Layout } from '@/layouts/layout'
import { Header } from '@/components/header'
import { Icons } from '@/components/icon'
import { BookingManager } from '@/components/booking_manager'
import { BookingTable } from '@/components/booking_table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Choice {
  bookingDateId: BookingDateId
  userChoice: number
}

interface CurrentUser {
  id: number
  firstName: string
  lastName: string
  choices: Choice[]
}

export interface Props {
  currentUser: CurrentUser
  users: User[]
  datesAvailable: BookingDate[]
}

export default function Home(props: Props) {
  const { datesAvailable } = props
  const { user } = usePage<{ user: User }>().props

  return (
    <Layout title="Accueil">
      <Header />
      <div className="flex-1 space-y-4 py-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="block text-xl md:text-3xl font-bold tracking-tight">Espace fosse</h2>
          {user.role === UserRole.Instructor && datesAvailable.length > 0 && (
            <BookingManager datesAvailable={datesAvailable} />
          )}
        </div>

        {datesAvailable.length > 0 ? (
          <BookingTable {...props} />
        ) : (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold">Dates indisponibles</CardTitle>
              <Icons.forbidden className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Patientez le temps qu'un moniteur mette à disposition de nouveaux créneaux
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  )
}
