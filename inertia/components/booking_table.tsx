import { type FormEvent, useState, useEffect, useMemo, useCallback } from 'react'
import { useForm } from '@inertiajs/react'
import { UserChoices } from '#enums/user_choices'
import { Props } from 'pages/home'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Icons } from './icon'
import { useToast } from './ui/use_toast'
import { BookingManager } from './booking_manager'
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
  const headers = useMemo(
    () => ['Nom', ...datesAvailable.map((date) => date.dateAvailable.toLocaleString())],
    [datesAvailable]
  )
  const usersWithChoices = users.filter((user) => user.choices.length > 0)

  const initialData = useMemo(
    () =>
      datesAvailable.map((date) => {
        return {
          bookingDateId: date.id,
          userChoice: currentUser.choices.find((choice) => choice.bookingDateId === date.id)
            ?.userChoice,
        }
      }),
    [datesAvailable, currentUser.choices]
  )

  const { data, setData, post } = useForm({
    choices: initialData,
  })

  useEffect(() => {
    const updatedData = datesAvailable.map((date) => {
      return {
        bookingDateId: date.id,
        userChoice: currentUser.choices.find((choice) => choice.bookingDateId === date.id)
          ?.userChoice,
      }
    })
    setData('choices', updatedData)
  }, [datesAvailable, currentUser.choices])

  const handleSelectChange = useCallback(
    (index: number, value: string) => {
      data.choices[index].userChoice = Number(value)
      setData('choices', [...data.choices])
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
    <div className="rounded-md border">
      <Table className="text-xs sm:text-sm">
        <TableCaption className="sr-only">Créneaux de la fosse Loic Leferme</TableCaption>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index} className="font-medium">
                {header}
              </TableHead>
            ))}
            <BookingManager datesAvailable={datesAvailable} />
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="bg-muted/20">
            <TableCell className="font-medium">
              {currentUser.firstName} {currentUser.lastName}
            </TableCell>
            {datesAvailable.map((_date, index) => (
              <TableCell key={index}>
                {editMode ? (
                  <Select
                    defaultValue={
                      currentUser.choices[index]?.userChoice?.toString() ||
                      UserChoices.NotSpecified.toString()
                    }
                    onValueChange={(value) => handleSelectChange(index, value)}
                  >
                    <SelectTrigger className="w-full max-w-[180px] h-8 rounded-md px-3 text-xs sm:text-sm">
                      <SelectValue placeholder="Choisir" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem className="text-xs sm:text-sm" value={UserChoices.Yes.toString()}>
                        Présent
                      </SelectItem>
                      <SelectItem className="text-xs sm:text-sm" value={UserChoices.No.toString()}>
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
                {usersWithChoices.filter(
                  (user) => user.choices[index].userChoice === UserChoices.Yes
                ).length +
                  (currentUser.choices[index]?.userChoice === UserChoices.Yes ? 1 : 0)}{' '}
                / {users.length}
              </TableCell>
            ))}
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
