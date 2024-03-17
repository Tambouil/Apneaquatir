import BookingDates from '#models/booking_date'
import { HttpContext } from '@adonisjs/core/http'

export default class BookingDatesController {
  async store({ request, response, params }: HttpContext) {
    const dates = request.input('dates')

    const dateRecords = dates.map((date: Date) => ({ dateAvailable: date, userId: params.id }))

    await BookingDates.createMany(dateRecords)

    return response.redirect().back()
  }
}
