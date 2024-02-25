import BookindDates from '#models/booking_dates'
import { HttpContext } from '@adonisjs/core/http'

export default class BookingDatesController {
  async create({ request, response }: HttpContext) {
    const payload = request.input('dateInput')

    const datesArray = payload.split(',').map((date: string) => date.trim())

    await BookindDates.create({ dateAvailable: datesArray })

    return response.redirect('/')
  }
}
