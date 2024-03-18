import BookingChoice from '#models/booking_choice'
import BookingDate from '#models/booking_date'
import BookingDates from '#models/booking_date'
import { HttpContext } from '@adonisjs/core/http'

export default class BookingDatesController {
  async store({ request, response, params }: HttpContext) {
    const dates = request.input('dates')
    const dateRecords = dates.map((date: Date) => ({ dateAvailable: date, userId: params.id }))

    await BookingDate.query().update({ isArchived: true })
    await BookingChoice.query().update({ isArchived: true })

    await BookingDates.createMany(dateRecords)

    return response.redirect().back()
  }

  async update({ request, response, auth }: HttpContext) {
    const currentUser = auth.getUserOrFail()
    const newDate = request.input('newDate')
    const datesToDelete = request.input('datesToDelete')

    if (!currentUser) {
      return response.unauthorized()
    }

    if (datesToDelete.length > 0) {
      await BookingDate.query().whereIn('id', datesToDelete).update({ isArchived: true })
      await BookingChoice.query()
        .whereIn('bookingDateId', datesToDelete)
        .update({ isArchived: true })
    }

    if (newDate) {
      await BookingDates.create({ dateAvailable: newDate, userId: currentUser.id })
    }

    return response.redirect().back()
  }
}
