import { DateTime } from 'luxon'

interface FormattedDate {
  bookingDateId: string
  formattedDate: string
}

export class DatePresenter {
  formatDates(dates: { id: string; dateAvailable: DateTime }[]): FormattedDate[] {
    const sortedDates: FormattedDate[] = dates
      .sort((a, b) => a.dateAvailable.toMillis() - b.dateAvailable.toMillis())
      .map(({ dateAvailable, id }) => {
        const formattedDate = dateAvailable
          .setZone('Europe/Paris')
          .setLocale('fr')
          .toFormat('EEEE dd MMMM')
        return {
          formattedDate,
          bookingDateId: id,
        }
      })

    return sortedDates
  }
}
