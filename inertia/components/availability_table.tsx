import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableCaption,
  TableFooter,
} from './ui/table'
import { Icons } from './icon'
import Availability from '#models/availability'
import User from '#models/user'

interface Props {
  availabilities: Availability[]
  allMonitors: User[]
}

export const AvailabilityTable = (props: Props) => {
  const { availabilities } = props

  const mapTraining = (training: string) => {
    switch (training) {
      case 'static':
        return 'Statique'
      case 'dynamic':
        return 'Dynamique'
      case 'space':
        return 'Espace proche'
      case 'pool':
        return 'Fosse'
      default:
        return 'Statique'
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption className="sr-only">Tableau des disponibilités</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            {availabilities.map((date, index) => (
              <TableHead key={index} className="border-x" colSpan={date.training.length}>
                {date.dateAvailable.toLocaleString()}
              </TableHead>
            ))}
          </TableRow>
          <TableRow>
            <TableHead></TableHead>
            {availabilities.map((date) =>
              date.training.map((tr) => (
                <TableHead key={tr} className="border-x">
                  {mapTraining(tr)}
                </TableHead>
              ))
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.allMonitors.map((monitor) => (
            <TableRow key={monitor.id}>
              <TableCell>{monitor.firstName}</TableCell>
              {availabilities.map((date) =>
                date.training.map((_tr, index) => (
                  <TableCell key={index} className="border-x">
                    <p className="flex items-center">
                      <span className="font-medium">Absent</span>{' '}
                      <Icons.cross className="w-4 h-4 text-red-500 ml-2" />
                    </p>
                  </TableCell>
                ))
              )}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>
              <span className="font-medium">Total</span>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
