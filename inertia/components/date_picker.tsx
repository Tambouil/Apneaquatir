import React from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { useForm } from '@inertiajs/react'
import { format } from 'date-fns'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { cn } from '../utils/utils'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { Label } from './ui/label'
import { Icons } from './icon'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from './ui/alert_dialog'
import { useToast } from './ui/use_toast'

export function DatePicker({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [showAlertDialog, setShowAlertDialog] = React.useState(false)

  const { data, setData, post, errors, processing, reset } = useForm({
    dates: [new Date()] as Date[] | undefined,
  })
  const { toast } = useToast()

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setShowAlertDialog(true)
  }

  return (
    <form className={cn('flex gap-2', className)} onSubmit={handleSubmit}>
      <Label className="sr-only" htmlFor="email">
        Dates
      </Label>
      {errors.dates && (
        <span className="text-red-500 text-sm mt-1 font-medium block">{errors.dates}</span>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'justify-start text-left font-normal',
              !data.dates && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {data.dates?.length === 1
              ? format(data.dates[0], 'LLL dd, y')
              : data.dates?.map((date, index) => (
                  <span key={index}>
                    {format(date, 'LLL dd, y')}
                    {data.dates && index !== data.dates.length - 1 && ' - '}
                  </span>
                )) || <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="multiple"
            defaultMonth={data.dates ? data.dates[0] : undefined}
            selected={data.dates}
            onSelect={(selectedDates) => setData('dates', selectedDates)}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button type="submit">
            {processing && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Nouveau tableau
          </Button>
        </AlertDialogTrigger>
        {showAlertDialog && (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Attention</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir créer un nouveau tableau ? <br />
              Le tableau précent sera archivé
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setShowAlertDialog(false), reset()
                }}
              >
                Annuler
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  post('/booking', {
                    onSuccess: () => {
                      setShowAlertDialog(false)
                      reset()
                      toast({
                        title: 'Nouveau tableau créé avec succès 🎉',
                        description:
                          'Les nouvelles dates sont maintenant disponibles à la réservation',
                      })
                    },
                  })
                }}
              >
                Continuer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        )}
      </AlertDialog>
    </form>
  )
}
