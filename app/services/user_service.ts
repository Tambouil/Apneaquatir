import BookingDate from '#models/booking_date'
import User from '#models/user'

export default class UserService {
  // Get all users except the current user
  async getAllUsers(currentUser: User) {
    return await User.query()
      .select('id', 'firstName', 'lastName')
      .where('id', '<>', currentUser.id)
      .preload('choices', (query) => {
        query
          .select('bookingDateId', 'userChoice')
          .where('isArchived', false)
          .orderBy('created_at', 'asc')
      })
  }

  // Get the current user with their choices
  async getCurrentUser(currentUser: User) {
    return await User.query()
      .preload('choices', (query) => {
        query
          .select('bookingDateId', 'userChoice')
          .where('isArchived', false)
          .orderBy('bookingDateId', 'asc')
      })
      .where('id', currentUser.id)
      .firstOrFail()
  }

  // Get the current user with their choices and the dates available
  async getCurrentUserWithChoicesAndDates(currentUser: User, currentDatesAvailable: BookingDate[]) {
    const currentUserWithChoices = await this.getCurrentUser(currentUser)

    const mappedDates = currentDatesAvailable.map((date) => {
      const choice = currentUserWithChoices.choices.find((ch) => ch.bookingDateId === date.id)
      return {
        ...date.toJSON(),
        userChoice: choice ? choice.userChoice : null,
      }
    })

    return {
      ...currentUserWithChoices.toJSON(),
      choices: mappedDates,
    }
  }
}
