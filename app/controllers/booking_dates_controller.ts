import BookingDates from '#models/booking_date'
import { HttpContext } from '@adonisjs/core/http'

export default class BookingDatesController {
  async store({ request, response }: HttpContext) {
    const { dates } = request.only(['dates'])

    const dateRecords = dates.map((date: string) => ({ dateAvailable: date }))

    await BookingDates.query().update({ isArchived: true })

    await BookingDates.createMany(dateRecords)

    return response.redirect().back()
  }
}
