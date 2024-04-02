import type { UserId } from '#models/user'
import type { AvailabilityDateId } from '#models/availability_date'
import type { TrainingId } from '#models/training'
import User from '#models/user'
import { usePage } from '@inertiajs/react'
import { UserRole } from '#enums/user_role'

import { Layout } from '~/layouts/layout'
import { Header } from '~/components/header'
import { Icons } from '~/components/icon'
import { AvailabilityTable } from '~/components/availability_table'
import { AvailabilityManager } from '~/components/availability_manager'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'

interface Training {
  id: TrainingId
  name: string
  availability: number
}

interface InstructorAvailability {
  trainingId: TrainingId
  availability: number
}

interface OtherInstructor {
  id: UserId
  firstName: string
  lastName: string
  email: string
  role: number
  instructorAvailabilities: InstructorAvailability[]
}

export interface Props {
  tableHead: {
    id: AvailabilityDateId
    date: string
    trainings: Training[]
  }[]
  otherInstructors: OtherInstructor[]
}

export default function Instructor(props: Props) {
  const { tableHead } = props
  const { user } = usePage<{ user: User }>().props

  return (
    <Layout title="Espace instructeurs">
      <Header />
      <div className="flex-1 space-y-4 py-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="block text-xl md:text-3xl font-bold tracking-tight">Espace moniteurs</h2>
          {user.role !== UserRole.User && tableHead.length > 0 && (
            <AvailabilityManager tableHead={tableHead} />
          )}
        </div>

        {tableHead.length > 0 ? (
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
