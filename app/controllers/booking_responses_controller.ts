import BookingResponse from '#models/booking_response'
import { HttpContext } from '@adonisjs/core/http'

export default class BookingResponsesController {
  async store({ request, response, auth }: HttpContext) {
    const authenticatedUser = await auth.authenticate()

    const { choices } = request.only(['choices'])

    for (const choice of choices) {
      const { bookingDateId, choice: userParticipation } = choice
      await BookingResponse.create({
        userId: authenticatedUser.id,
        bookingDateId: bookingDateId,
        userParticipation: userParticipation,
      })
    }

    return response.redirect().back()
  }
}
