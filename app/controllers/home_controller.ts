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

    const currentUserWithBookings = await User.query()
      .preload('bookings', (query) => {
        query.select('dateAvailable').where('isArchived', false).orderBy('dateAvailable', 'asc')
      })
      .preload('choices', (query) => {
        query
          .select('bookingDateId', 'userChoice')
          .where('isArchived', false)
          .orderBy('created_at', 'asc')
      })
      .where('id', currentUser.id)

    return inertia.render('home', {
      datesAvailable: formattedDates,
      users,
      currentUser: currentUserWithBookings.map((user) => ({
        ...user.toJSON(),
        bookings: this.datePresenter.formatDates(user.bookings),
      }))[0],
    })
  }
}
