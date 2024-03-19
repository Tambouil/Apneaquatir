import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription,
} from './ui/alert_dialog'
import { useEffect } from 'react'
import BookingDate, { type BookingDateId } from '#models/booking_date'
import { Button } from './ui/button'
import { Icons } from './icon'
import { Separator } from './ui/separator'
import { useForm } from '@inertiajs/react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Calendar } from './ui/calendar'
import { CalendarIcon } from '@radix-ui/react-icons'
import { cn } from '../utils/utils'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale/fr'

interface Props {
  datesAvailable: BookingDate[]
}

export const BookingManager = (props: Props) => {
  const { datesAvailable } = props

  const { data, setData, put } = useForm({
    dates: datesAvailable,
    datesToDelete: [] as BookingDateId[],
    newDate: undefined as Date | undefined,
  })

  useEffect(() => {
    setData('dates', datesAvailable)
  }, [datesAvailable])

  const handleDelete = (dateToDelete: BookingDate) => {
    setData({
      dates: data.dates.filter((date) => date.id !== dateToDelete.id),
      datesToDelete: [...data.datesToDelete, dateToDelete.id],
      newDate: data.newDate,
    })
  }

  const handleCancel = () => {
    setData({
      dates: datesAvailable,
      datesToDelete: [],
      newDate: undefined,
    })
  }

  const handleSave = () => {
    put('/booking/dates', {
      onSuccess: () => {
        setData({
          dates: datesAvailable,
          datesToDelete: [],
          newDate: undefined,
        })
      },
    })
  }

  return (
    <div className="text-end">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size={'sm'}>Modifier les dates</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ajouter ou supprimer une date</AlertDialogTitle>
          </AlertDialogHeader>

          <Separator />

          <AlertDialogDescription>Dates actuelles disponibles</AlertDialogDescription>

          {data.dates.map((date) => (
            <div key={date.id} className="flex items-center justify-between space-y-2">
              {date.dateAvailable.toLocaleString()}
              <Button size={'sm'} variant={'ghost'} onClick={() => handleDelete(date)}>
                <Icons.trash className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          ))}

          <Separator />

          <AlertDialogDescription>Ajouter une date à la liste</AlertDialogDescription>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full pl-3 text-left font-normal',
                  !data.newDate && 'text-muted-foreground'
                )}
              >
                {data.newDate
                  ? format(data.newDate, 'dd LLLL', { locale: fr })
                  : 'Sélectionnez une date'}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="single"
                defaultMonth={data.newDate}
                selected={data.newDate}
                onSelect={(selectedDate) => setData('newDate', selectedDate)}
              />
            </PopoverContent>
          </Popover>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleSave}>Enregistrer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
