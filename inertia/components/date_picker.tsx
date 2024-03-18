import React from 'react'
import User from '#models/user'
import { CalendarIcon } from '@radix-ui/react-icons'
import { useForm, usePage } from '@inertiajs/react'
import { format } from 'date-fns'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { cn } from '../utils/utils'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { Label } from './ui/label'
import { Icons } from './icon'
import { useToast } from './ui/use_toast'
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

export function DatePicker({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const { data, setData, post, errors, processing, reset } = useForm({
    dates: [new Date()] as Date[] | undefined,
  })

  const { user } = usePage<{ user: User }>().props
  const { toast } = useToast()

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
  }

  return (
    <form className={cn('flex gap-2', className)} onSubmit={handleSubmit}>
      <Label className="sr-only" htmlFor="dates">
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
                    {data.dates && index !== data.dates?.length - 1 && ' - '}
                  </span>
                )) || <span>Sélectionnez une date</span>}
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
          <Button type="submit" disabled={data.dates?.length === 0}>
            {processing && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Nouveau tableau
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Attention</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Êtes-vous sûr de vouloir créer un nouveau tableau ? <br />
            <span className="underline">Les précédentes dates seront archivées</span>
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                post('/booking/dates/' + user.id, {
                  onSuccess: () => {
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
      </AlertDialog>
    </form>
  )
}
