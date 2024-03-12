import User from '#models/user'
import { useState, FormEvent } from 'react'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Icons } from './icon'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { useForm } from '@inertiajs/react'

interface FormattedDate {
  bookingDateId: string
  formattedDate: string
  choice: string
}

interface Props {
  user: User
  datesAvailable: FormattedDate[]
}

// ... (autres imports)

export const BookingTable = (props: Props) => {
  const { user, datesAvailable } = props
  const { post, data, setData } = useForm({
    choices: datesAvailable.map((date) => ({ ...date, choice: '' })), // Utilisation de "choices" comme clé
  })

  const [editMode, setEditMode] = useState(false)

  const handleSelectChange = (index: number, value: string) => {
    const updatedChoices = [...data.choices] // Utilisation de "choices"
    updatedChoices[index] = { ...updatedChoices[index], choice: value }
    setData('choices', updatedChoices) // Mise à jour de "choices" dans le state

    // Vous pouvez également utiliser setData sans fournir le champ spécifique
    // setData(updatedChoices);
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setEditMode(false)
    post('/booking/choices')
  }

  const headers = ['nom', ...datesAvailable.map((date) => date.formattedDate), '']

  return (
    <Table>
      <TableCaption className="sr-only">Dates de réservation du mois de mars 2024</TableCaption>
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHead key={index}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">
            {user.firstName} {''}
            {user.lastName}
          </TableCell>
          {datesAvailable.map(({}, index: number) => (
            <TableCell key={index}>
              {editMode ? (
                <Select
                  value={data.choices[index].choice || ''}
                  onValueChange={(value) => handleSelectChange(index, value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choisir" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">
                      <Icons.check className="w-6 h-6 text-green-500" />
                    </SelectItem>
                    <SelectItem value="no">
                      <Icons.cross className="w-6 h-6 text-red-500" />
                    </SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <span>
                  {data.choices[index].choice === 'yes' ? (
                    <Icons.check className="w-6 h-6 text-green-500" />
                  ) : data.choices[index].choice === 'no' ? (
                    <Icons.cross className="w-6 h-6 text-red-500" />
                  ) : (
                    'Non spécifié'
                  )}
                </span>
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
      </TableBody>
    </Table>
  )
}
