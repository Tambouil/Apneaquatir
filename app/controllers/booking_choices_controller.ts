import type { BookingDateId } from '#models/booking_date'
import { HttpContext } from '@adonisjs/core/http'
import BookingChoice from '#models/booking_choice'

interface Choice {
  bookingDateId: BookingDateId
  userChoice: number
}

export default class BookingChoicesController {
  async store({ request, response, params }: HttpContext) {
    const { choices } = request.only(['choices'])

    const updates = choices.map((choice: Choice) => {
      return {
        bookingDateId: choice.bookingDateId,
        userId: params.id,
        userChoice: choice.userChoice,
      }
    })

    await BookingChoice.updateOrCreateMany(['bookingDateId', 'userId'], updates)

    response.redirect().back()
  }
}
