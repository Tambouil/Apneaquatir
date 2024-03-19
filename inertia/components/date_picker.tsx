import React from 'react'
import User from '#models/user'
import { CalendarIcon } from '@radix-ui/react-icons'
import { useForm, usePage } from '@inertiajs/react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale/fr'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { cn } from '../utils/utils'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { Label } from './ui/label'
import { Icons } from './icon'
import { useToast } from './ui/use_toast'

export function DatePicker({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const { data, setData, post, errors, processing, reset } = useForm({
    dates: undefined as Date[] | undefined,
  })

  const { user } = usePage<{ user: User }>().props
  const { toast } = useToast()

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    post('/booking/dates/' + user.id, {
      onSuccess: () => {
        reset()
        toast({
          title: 'Nouveau tableau créé avec succès 🎉',
          description: 'Les nouvelles dates sont maintenant disponibles à la réservation',
        })
      },
    })
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
              ? format(data.dates[0], 'dd LLLL', { locale: fr })
              : data.dates?.map((date, index) => (
                  <span key={index} className="truncate">
                    {format(date, 'dd LLLL', { locale: fr })}
                    {data.dates && index !== data.dates?.length - 1 && ' - '}
                  </span>
                )) || <span>Sélectionnez une ou plusieurs dates</span>}
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

      <Button type="submit" disabled={data.dates === undefined || processing}>
        {processing && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Enregistrer
      </Button>
    </form>
  )
}
