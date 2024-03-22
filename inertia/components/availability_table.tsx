import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableCaption,
} from './ui/table'
import User from '#models/user'
import { type FormEvent, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Props } from 'pages/instructor'
import { useForm, usePage } from '@inertiajs/react'
import { UserChoices } from '#enums/user_choices'
import { Icons } from './icon'
import { Button } from './ui/button'
import { useToast } from './ui/use_toast'
import { UserRole } from '#enums/user_role'

export const AvailabilityTable = (props: Props) => {
  const { tableHead, otherInstructors } = props
  const { user } = usePage<{ user: User }>().props
  const { toast } = useToast()
  const [editMode, setEditMode] = useState(false)

  const initialData = tableHead.map((date) => ({
    id: date.id,
    date: date.date,
    trainings: date.trainings.map((training) => ({
      id: training.id,
      name: training.name,
      availability: training.availability || UserChoices.NotSpecified,
    })),
  }))

  const { setData, post } = useForm({
    availabilities: initialData,
  })

  const handleSelectChange = (dateIndex: number, trainingIndex: number, newValue: string) => {
    setData((prevData) => {
      const newData = [...prevData.availabilities]
      newData[dateIndex].trainings[trainingIndex].availability = Number(newValue)
      return { ...prevData, availabilities: newData }
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setEditMode(false)

    post('/instructor', {
      onSuccess: () => {
        toast({
          title: 'Vos choix ont été enregistrés',
          description: 'Vous pouvez à tout moment les modifier',
        })
      },
      onError: () => {
        toast({
          title: 'Une erreur est survenue',
          description: 'Veuillez réessayer',
        })
      },
    })
  }

  const instructorsWithAvailabilities = otherInstructors.filter(
    (instructor) => instructor.instructorAvailabilities.length > 0
  )

  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption className="sr-only">Tableau des disponibilités</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead rowSpan={2}>Nom</TableHead>
            {tableHead.map((date, index) => (
              <TableHead key={index} className="border-x" colSpan={date.trainings.length}>
                {date.date}
              </TableHead>
            ))}
          </TableRow>
          <TableRow>
            {tableHead.map((date) =>
              date.trainings.map((training) => (
                <TableHead key={training.id} className="border-x">
                  {training.name}
                </TableHead>
              ))
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {user.role === UserRole.Instructor && (
            <TableRow className="bg-muted/20">
              <TableCell className="font-medium">
                {user.firstName} {user.lastName}
              </TableCell>
              {tableHead.map((date, dateIndex) =>
                date.trainings.map((training, trainingIndex) => (
                  <TableCell key={training.id}>
                    {editMode ? (
                      <Select
                        defaultValue={
                          training.availability?.toString() || UserChoices.NotSpecified.toString()
                        }
                        onValueChange={(newValue) =>
                          handleSelectChange(dateIndex, trainingIndex, newValue)
                        }
                      >
                        <SelectTrigger className="w-full h-8 rounded-md px-3 text-xs sm:text-sm">
                          <SelectValue placeholder="Choisir" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            className="text-xs sm:text-sm"
                            value={UserChoices.Yes.toString()}
                          >
                            Présent
                          </SelectItem>
                          <SelectItem
                            className="text-xs sm:text-sm"
                            value={UserChoices.No.toString()}
                          >
                            Absent
                          </SelectItem>
                          <SelectItem
                            className="text-xs sm:text-sm"
                            value={UserChoices.NotSpecified.toString()}
                          >
                            Non renseigné
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    ) : training.availability === UserChoices.Yes ? (
                      <p className="flex items-center">
                        <span className="font-medium">Présent</span>{' '}
                        <Icons.check className="w-4 h-4 text-green-500 ml-2" />
                      </p>
                    ) : training.availability === UserChoices.No ? (
                      <p className="flex items-center">
                        <span className="font-medium">Absent</span>{' '}
                        <Icons.cross className="w-4 h-4 text-red-500 ml-2" />
                      </p>
                    ) : (
                      <p className="text-muted-foreground">Non renseigné</p>
                    )}
                  </TableCell>
                ))
              )}

              <TableCell className="text-end">
                {editMode ? (
                  <form onSubmit={handleSubmit}>
                    <Button type="submit" size={'sm'}>
                      Sauvegarder
                    </Button>
                  </form>
                ) : (
                  <Button size={'sm'} onClick={() => setEditMode(true)}>
                    Modifier
                  </Button>
                )}
              </TableCell>
            </TableRow>
          )}

          {user.role !== UserRole.Instructor && instructorsWithAvailabilities.length === 0 && (
            <TableRow>
              <TableCell colSpan={tableHead.length + 1}>
                <p className="text-muted-foreground">
                  Aucun moniteur n'a renseigné sa disponibilité pour l'instant
                </p>
              </TableCell>
            </TableRow>
          )}

          {instructorsWithAvailabilities.map((instructor) => (
            <TableRow key={instructor.id}>
              <TableCell className="font-medium">
                {instructor.firstName} {instructor.lastName}
              </TableCell>
              {tableHead.map((date) =>
                date.trainings.map((training, index) => {
                  const availability = instructor.instructorAvailabilities.find(
                    (avail) => avail.trainingId === training.id
                  )?.availability

                  return (
                    <TableCell key={index}>
                      {availability === UserChoices.Yes ? (
                        <p className="flex items-center">
                          <span className="font-medium">Présent</span>{' '}
                          <Icons.check className="w-4 h-4 text-green-500 ml-2" />
                        </p>
                      ) : availability === UserChoices.No ? (
                        <p className="flex items-center">
                          <span className="font-medium">Absent</span>{' '}
                          <Icons.cross className="w-4 h-4 text-red-500 ml-2" />
                        </p>
                      ) : (
                        <p className="text-muted-foreground">Non renseigné</p>
                      )}
                    </TableCell>
                  )
                })
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
