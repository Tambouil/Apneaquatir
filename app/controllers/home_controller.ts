import BookingDates from '#models/booking_dates'
import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  async renderView({ view }: HttpContext) {
    const users = await User.all()
    const dates = await BookingDates.query()
      .select('batchId')
      .select('dateAvailable')
      .groupBy('batchId', 'dateAvailable')
      .distinct('batchId', 'dateAvailable')

    const groupedDates = dates.reduce(
      (acc, booking) => {
        const foundBatch = acc.find((group) => group.batchId === booking.batchId)

        if (foundBatch) {
          foundBatch.dates.push(booking.dateAvailable)
        } else {
          acc.push({
            batchId: booking.batchId,
            dates: [booking.dateAvailable],
          })
        }

        return acc
      },
      [] as { batchId: string; dates: string[] }[]
    )

    return view.render('pages/home', { groupedDates, users })
  }
}
