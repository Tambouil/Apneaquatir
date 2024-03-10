import BookingDates from '#models/booking_dates'
import { HttpContext } from '@adonisjs/core/http'

export default class BookingDatesController {
  async store({ request, response }: HttpContext) {
    const { dates } = request.all()

    await BookingDates.create({ dateAvailable: dates })

    return response.redirect().back()
  }
}
