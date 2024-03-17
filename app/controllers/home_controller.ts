import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { DatePresenter } from '../presenters/dates.js'
import User from '#models/user'
import BookingDate from '#models/booking_date'

@inject()
export default class HomeController {
  constructor(private datePresenter: DatePresenter) {}

  async index({ inertia, response, auth }: HttpContext) {
    const currentUser = auth.getUserOrFail()

    if (!currentUser) {
      return response.unauthorized()
    }

    const currentDatesAvailable = await BookingDate.query()
      .select('id', 'dateAvailable')
      .where('isArchived', false)
      .orderBy('dateAvailable', 'asc')
    const formattedDates = this.datePresenter.formatDates(currentDatesAvailable)

    const users = await User.query()
      .select('id', 'firstName', 'lastName')
      .where('id', '<>', currentUser.id)
      .preload('choices', (query) => {
        query
          .select('bookingDateId', 'userChoice')
          .where('isArchived', false)
          .orderBy('created_at', 'asc')
      })

    const currentUserWithChoices = await User.query()
      .preload('choices', (query) => {
        query
          .select('bookingDateId', 'userChoice')
          .where('isArchived', false)
          .orderBy('bookingDateId', 'asc')
      })
      .where('id', currentUser.id)
      .firstOrFail()

    const mappedDates = currentDatesAvailable.map((date) => {
      const choice = currentUserWithChoices.choices.find((ch) => ch.bookingDateId === date.id)
      return {
        ...date.toJSON(),
        userChoice: choice ? choice.userChoice : null,
      }
    })

    return inertia.render('home', {
      datesAvailable: formattedDates,
      users,
      currentUser: {
        ...currentUserWithChoices.toJSON(),
        choices: mappedDates,
      },
    })
  }
}
