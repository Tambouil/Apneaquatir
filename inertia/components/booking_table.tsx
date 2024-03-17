import { useState, FormEvent, useCallback } from 'react'
import { useForm } from '@inertiajs/react'
import { UserChoices } from '#enums/user_choices'
import { Props } from 'pages/home'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Icons } from './icon'
import { useToast } from './ui/use_toast'
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

export const BookingTable = (props: Props) => {
  const { currentUser, users, datesAvailable } = props
  const { toast } = useToast()

  const [editMode, setEditMode] = useState(false)
  const headers = ['Nom', ...datesAvailable.map((date) => date.dateAvailable.toLocaleString()), '']
  const usersWithChoices = users.filter((user) => user.choices.length > 0)

  const { data, setData, post } = useForm({
    choices: datesAvailable.map((date) => {
      return {
        bookingDateId: date.id,
        userChoice: currentUser.choices.find((choice) => choice.bookingDateId === date.id)
          ?.userChoice,
      }
    }),
  })

  const handleSelectChange = useCallback(
    (index: number, value: string) => {
      const updatedData = [...data.choices]
      updatedData[index].userChoice = Number(value)
      setData('choices', updatedData)
    },
    [data, setData]
  )

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setEditMode(false)
    post('/booking/choices/' + currentUser.id, {
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

  return (
    <Table>
      <TableCaption className="sr-only">Créneaux de la fosse Loic Leferme</TableCaption>
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHead key={index} className="font-medium">
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">
            {currentUser.firstName} {currentUser.lastName}
          </TableCell>
          {datesAvailable.map((_date, index) => (
            <TableCell key={index}>
              {editMode ? (
                <Select
                  defaultValue={
                    currentUser.choices[index]?.userChoice.toString() ||
                    UserChoices.NotSpecified.toString()
                  }
                  onValueChange={(value) => handleSelectChange(index, value)}
                >
                  <SelectTrigger className="w-full max-w-[180px]">
                    <SelectValue placeholder="Choisir" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={UserChoices.Yes.toString()}>Présent</SelectItem>
                    <SelectItem value={UserChoices.No.toString()}>Absent</SelectItem>
                    <SelectItem value={UserChoices.NotSpecified.toString()}>
                      Non renseigné
                    </SelectItem>
                  </SelectContent>
                </Select>
              ) : currentUser.choices[index]?.userChoice === UserChoices.Yes ? (
                <p className="flex items-center">
                  <span className="font-medium">Présent</span>{' '}
                  <Icons.check className="w-4 h-4 text-green-500 ml-2" />
                </p>
              ) : currentUser.choices[index]?.userChoice === UserChoices.No ? (
                <p className="flex items-center">
                  <span className="font-medium">Absent</span>{' '}
                  <Icons.cross className="w-4 h-4 text-red-500 ml-2" />
                </p>
              ) : (
                <p className="text-muted-foreground">Non renseigné</p>
              )}
            </TableCell>
          ))}

          <TableCell className="text-end">
            {editMode ? (
              <form onSubmit={handleSubmit}>
                <Button type="submit">Sauvegarder</Button>
              </form>
            ) : (
              <Button onClick={() => setEditMode(true)}>Modifier</Button>
            )}
          </TableCell>
        </TableRow>

        {usersWithChoices.map((usersWithChoice) => (
          <TableRow key={usersWithChoice.id}>
            <TableCell className="font-medium">
              {usersWithChoice.firstName} {usersWithChoice.lastName}
            </TableCell>
            {datesAvailable.map((_date, index) => (
              <TableCell key={index}>
                {usersWithChoice.choices[index].userChoice === UserChoices.Yes ? (
                  <p className="flex items-center">
                    <span className="font-medium">Présent</span>{' '}
                    <Icons.check className="w-4 h-4 text-green-500 ml-2" />
                  </p>
                ) : usersWithChoice.choices[index].userChoice === UserChoices.No ? (
                  <p className="flex items-center">
                    <span className="font-medium">Absent</span>{' '}
                    <Icons.cross className="w-4 h-4 text-red-500 ml-2" />
                  </p>
                ) : (
                  <p className="text-muted-foreground">Non renseigné</p>
                )}
              </TableCell>
            ))}
            <TableCell></TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell className="font-medium">Total</TableCell>
          {datesAvailable.map((_date, index) => (
            <TableCell key={index}>
              {
                usersWithChoices.filter(
                  (user) => user.choices[index].userChoice === UserChoices.Yes
                ).length
              }
            </TableCell>
          ))}
          <TableCell></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
