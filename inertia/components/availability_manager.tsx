import type { AvailabilityDateId } from '#models/availability_date'
import type { TrainingId } from '#models/training'
import { useEffect } from 'react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale/fr'
import { CalendarIcon } from '@radix-ui/react-icons'

import { cn } from '~/lib/utils'
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
} from '~/components/ui/alert_dialog'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { Button } from '~/components/ui/button'
import { Icons } from '~/components/icon'
import { Separator } from '~/components/ui/separator'
import { useForm } from '@inertiajs/react'
import { Calendar } from '~/components/ui/calendar'
import { Checkbox } from '~/components/ui/checkbox'
import { Label } from '~/components/ui/label'
import { useToast } from '~/components/ui/use_toast'

interface Training {
  id: TrainingId
  name: string
  availability: number
}

export interface Props {
  tableHead: {
    id: AvailabilityDateId
    date: string
    trainings: Training[]
  }[]
}

export const AvailabilityManager = (props: Props) => {
  const { tableHead } = props
  const { toast } = useToast()

  const checkboxItems = [
    { id: 'dynamic', label: 'Dynamique' },
    { id: 'static', label: 'Statique' },
    { id: 'pool', label: 'Fosse' },
    { id: 'space', label: 'Espace proche' },
  ]

  const { data, setData, put, reset } = useForm({
    dates: tableHead,
    datesToDelete: [] as AvailabilityDateId[],
    newDate: undefined as Date | undefined,
    newTrainings: [] as string[],
  })

  useEffect(() => {
    setData('dates', tableHead)
  }, [tableHead])

  const handleDelete = (dateToDelete: {
    id: AvailabilityDateId
    date: string
    trainings: Training[]
  }) => {
    setData({
      dates: data.dates.filter((date) => date.id !== dateToDelete.id),
      datesToDelete: [...data.datesToDelete, dateToDelete.id],
      newDate: data.newDate,
      newTrainings: data.newTrainings,
    })
  }

  const handleAddDate = () => {
    setData({
      dates: [...data.dates],
      datesToDelete: data.datesToDelete,
      newDate: data.newDate,
      newTrainings: data.newTrainings,
    })
  }

  const handleCheckboxChange = (checked: boolean, training: string) => {
    setData(
      'newTrainings',
      checked
        ? [...data.newTrainings, training]
        : data.newTrainings.filter((value) => value !== training)
    )
  }

  const handleSave = () => {
    handleAddDate()
    put('/availability', {
      onSuccess: () => {
        toast({
          title: 'Vos modifications ont été enregistrées',
          description: 'Vous pouvez à tout moment les modifier',
        })
        reset()
      },
      onError: () => {
        toast({
          title: 'Une erreur est survenue',
          description: 'Veuillez réessayer',
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
              {date.date}
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

          <div className="flex flex-wrap items-center p-2">
            {checkboxItems.map((item) => (
              <div key={item.id} className="flex items-center p-2">
                <Checkbox
                  id={item.id}
                  onCheckedChange={(checked: boolean) => handleCheckboxChange(checked, item.id)}
                />
                <Label htmlFor={item.id} className="ml-2">
                  {item.label}
                </Label>
              </div>
            ))}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                reset()
              }}
            >
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSave}
              disabled={
                (data.newDate && data.newTrainings.length === 0) ||
                (!data.newDate && data.newTrainings.length > 0)
              }
            >
              Enregistrer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
