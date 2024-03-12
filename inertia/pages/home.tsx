import User from '#models/user'
import { Header } from '../components/header.js'
import { Layout } from '../layouts/layout.js'
import { DatePicker } from '../components/date_picker.js'
import { BookingTable } from '../components/booking_table.js'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.js'
import { Icons } from 'components/icon.js'

interface FormattedDate {
  formattedDate: string
  bookingDateId: string
  choice: string
}

interface Props {
  user: User
  datesAvailable: FormattedDate[] // Mettons à jour le type des dates disponibles
}

export default function Home(props: Props) {
  const { datesAvailable, user } = props

  return (
    <Layout title="Accueil">
      <Header />
      <div className="flex-1 space-y-4 py-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <DatePicker />
        </div>
        <div className="space-y4">
          {datesAvailable ? (
            <BookingTable datesAvailable={datesAvailable} user={user} />
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
      </div>
    </Layout>
  )
}
