import React, { type FormEvent } from 'react'
import { useForm, usePage } from '@inertiajs/react'
import { fr } from 'date-fns/locale/fr'
import { format } from 'date-fns'
import { CalendarIcon } from '@radix-ui/react-icons'
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover'
import { SettingsLayout } from '../layouts/settings_layout'
import { Separator } from '../components/ui/separator'
import { Button } from '../components/ui/button'
import { Calendar } from '../components/ui/calendar'
import { cn } from '../utils/utils'
import { Label } from '../components/ui/label'
import { Checkbox } from '../components/ui/checkbox'
import { Badge } from '../components/ui/badge'
import User, { type UserId } from '#models/user'

export default function Availability() {
  const { user } = usePage<{ user: User }>().props
  const sidebarNavItems = [
    { href: '/booking/dates', title: 'Fosse Loïc Leferme' },
    { href: '/availability', title: 'Disponibilités moniteurs' },
  ]

  const checkboxItems = [
    { id: 'dynamic', label: 'Dynamique' },
    { id: 'static', label: 'Statique' },
    { id: 'pool', label: 'Fosse' },
    { id: 'space', label: 'Espace proche' },
  ]

  const trainingBadge = (training: string) => {
    switch (training) {
      case 'dynamic':
        return <Badge className="text-xs">Dynamique</Badge>
      case 'static':
        return <Badge className="text-xs">Statique</Badge>
      case 'pool':
        return <Badge className="text-xs">Fosse</Badge>
      case 'space':
        return <Badge className="text-xs">Espace proche</Badge>
      default:
        return null
    }
  }

  const { data, setData, post, reset } = useForm({
    newDate: undefined as Date | undefined,
    trainings: [] as string[],
    trainingAvailabilities: [] as { userId: UserId; date: Date; trainings: string[] }[],
  })

  const handleCheckboxChange = (checked: boolean, training: string) => {
    setData(
      'trainings',
      checked ? [...data.trainings, training] : data.trainings.filter((value) => value !== training)
    )
  }

  const handleAddDate = () => {
    if (data.newDate && data.trainings.length > 0) {
      setData({
        trainingAvailabilities: [
          ...data.trainingAvailabilities,
          {
            userId: user.id,
            date: data.newDate,
            trainings: data.trainings,
          },
        ],
        newDate: undefined,
        trainings: [],
      })
    }
  }

  const handleRemoveDate = (date: Date) => {
    setData(
      'trainingAvailabilities',
      data.trainingAvailabilities.filter((d) => d.date !== date)
    )
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    post('/availability', {
      onSuccess: () => {
        reset()
      },
    })
  }

  return (
    <SettingsLayout
      title="Gestion"
      subTitle="Gestion des créneaux du club"
      description="pour la fosse et les disponibilités des moniteurs"
      sidebarNavItems={sidebarNavItems}
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <h3 className="text-lg font-medium">Mettre à jour les disponibilités des moniteurs</h3>
          <p className="text-sm text-muted-foreground">
            Remplacer le tableau actuel par de nouvelles dates. Attention, le tableau actuel sera
            archivé.
          </p>
        </div>

        {data.trainingAvailabilities.length > 0 && (
          <>
            <Separator />
            <div className="flex flex-wrap items-center space-x-2">
              {data.trainingAvailabilities.map((dateWithTraining, index) => (
                <div key={index} className="p-2">
                  <p className="flex items-center space-x-2">
                    {format(dateWithTraining.date, 'dd LLLL', { locale: fr })}
                    <button type="button" onClick={() => handleRemoveDate(dateWithTraining.date)}>
                      <svg
                        className="w-4 h-4 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </p>
                  <div className="flex items-center space-x-2">
                    {dateWithTraining.trainings.map((training, i) => (
                      <React.Fragment key={i}>{trainingBadge(training)}</React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <Separator />
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
                checked={data.trainings.includes(item.id)}
                onCheckedChange={(checked: boolean) => handleCheckboxChange(checked, item.id)}
              />
              <Label htmlFor={item.id} className="ml-2">
                {item.label}
              </Label>
            </div>
          ))}
        </div>
        <Button
          disabled={data.newDate === undefined || data.trainings.length === 0}
          onClick={handleAddDate}
        >
          Ajouter une date
        </Button>
        <div className="flex items-center justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => reset()}
            disabled={data.trainingAvailabilities.length === 0}
          >
            Annuler
          </Button>
          <Button type="submit" disabled={data.trainingAvailabilities.length === 0}>
            Enregister
          </Button>
        </div>
      </form>
    </SettingsLayout>
  )
}
