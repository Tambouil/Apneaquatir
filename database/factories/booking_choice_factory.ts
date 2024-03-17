import Factory from '@adonisjs/lucid/factories'
import { UserFactory } from './user_factory.js'
import { BookingDateFactory } from './booking_date_factory.js'
import { UserChoices } from '#enums/user_choices'
import BookingChoice from '#models/booking_choice'

export const BookingChoiceFactory = Factory.define(BookingChoice, ({ faker }) => {
  return {
    userChoice: faker.helpers.enumValue(UserChoices),
  }
})
  .relation('user', () => UserFactory)
  .relation('bookingDate', () => BookingDateFactory)
  .build()
