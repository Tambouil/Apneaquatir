import User from '#models/user'
import BookingDate, { type BookingDateId } from '#models/booking_date'
import { Header } from '../components/header.js'
import { Layout } from '../layouts/layout.js'
import { BookingTable } from '../components/booking_table.js'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.js'
import { Icons } from '../components/icon.js'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs.js'
import { BookingManager } from '../components/booking_manager.js'

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

  return (
    <Layout title="Accueil">
      <Header />
      <div className="flex-1 space-y-4 py-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="block text-xl md:text-3xl font-bold tracking-tight">Dashboard</h2>
          <BookingManager datesAvailable={datesAvailable} />
        </div>
        <Tabs defaultValue="booking" className="space-y-4">
          <TabsList>
            <TabsTrigger value="booking">Espace fosse</TabsTrigger>
            <TabsTrigger value="availability" disabled>
              Espace moniteur
            </TabsTrigger>
          </TabsList>
          <TabsContent value="booking" className="space-y-4">
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
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
