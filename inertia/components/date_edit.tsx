import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from './ui/alert_dialog'
import { TableHead } from './ui/table'
import { Button } from './ui/button'
import BookingDate, { type BookingDateId } from '#models/booking_date'
import { Icons } from './icon'
import { Separator } from './ui/separator'
import { useForm } from '@inertiajs/react'

interface Props {
  datesAvailable: BookingDate[]
}

export const DateEdit = (props: Props) => {
  const { datesAvailable } = props

  const {
    data,
    setData,
    delete: destroy,
  } = useForm({
    dates: datesAvailable,
    datesToDelete: [] as BookingDateId[],
  })

  const handleDelete = (dateToDelete: BookingDate) => {
    setData({
      dates: data.dates.filter((date) => date.id !== dateToDelete.id),
      datesToDelete: [...data.datesToDelete, dateToDelete.id],
    })
  }

  const handleCancel = () => {
    setData({
      dates: datesAvailable,
      datesToDelete: [],
    })
  }

  const handleSave = () => {
    destroy('/booking/dates', {
      onSuccess: () => {
        setData({
          dates: datesAvailable,
          datesToDelete: [],
        })
      },
    })
  }

  return (
    <TableHead className="text-end">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size={'sm'}>Modifier les dates</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ajouter ou supprimer une date</AlertDialogTitle>
          </AlertDialogHeader>

          {data.dates.map((date, index) => (
            <div key={index} className="flex items-center justify-between space-y-2">
              <div>{date.dateAvailable.toLocaleString()}</div>
              <Button size={'sm'} variant={'outline'} onClick={() => handleDelete(date)}>
                <Icons.cross className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          ))}

          <Separator className="my-4" />

          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleSave}>Enregistrer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TableHead>
  )
}
