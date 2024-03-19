import Availability from '#models/availability'
import User from '#models/user'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.js'
import { Header } from '../components/header.js'
import { Layout } from '../layouts/layout.js'
import { Icons } from '../components/icon.js'
import { AvailabilityTable } from '../components/availability_table.js'
import { Button } from '../components/ui/button.js'

interface Props {
  availabilities: Availability[]
  allMonitors: User[]
}

export default function Instructor(props: Props) {
  const { availabilities } = props
  console.log(availabilities)

  return (
    <Layout title="Accueil">
      <Header />
      <div className="flex-1 space-y-4 py-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="block text-xl md:text-3xl font-bold tracking-tight">Espace moniteurs</h2>
          {availabilities.length > 0 && <Button>Gérer les disponibilités</Button>}
        </div>

        {availabilities.length > 0 ? (
          <AvailabilityTable {...props} />
        ) : (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold">Disponibilités des moniteurs</CardTitle>
              <Icons.user className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Vous pourrez bientôt consulter les disponibilités des moniteurs pour les différents
                créneaux du club
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  )
}
