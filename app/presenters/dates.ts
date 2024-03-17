import BookingDate from '#models/booking_date'

export class DatePresenter {
  formatDates(dates: BookingDate[]) {
    return dates.map((date) => ({
      ...date.toJSON(),
      dateAvailable: date.dateAvailable
        .setZone('Europe/Paris')
        .setLocale('fr')
        .toFormat('EEEE dd MMMM'),
    }))
  }
}
