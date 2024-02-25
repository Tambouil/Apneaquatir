import BookingDates from '#models/booking_dates'
import { HttpContext } from '@adonisjs/core/http'
import { v4 as uuidv4 } from 'uuid'

export default class BookingDatesController {
  async create({ request, response }: HttpContext) {
    const payload = request.input('dateInput')
    const datesArray = payload.split(',').map((date: string) => date.trim())

    const batchId = uuidv4()

    const records = datesArray.map((date: string) => ({ date_available: date, batchId }))

    await BookingDates.createMany(records)

    return response.redirect('/')
  }
}
