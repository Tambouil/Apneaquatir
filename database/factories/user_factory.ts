import User from '#models/user'
import Factory from '@adonisjs/lucid/factories'
import { BookingDateFactory } from '#database/factories/booking_date_factory'
import { BookingChoiceFactory } from '#database/factories/booking_choice_factory'

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
})
  .relation('bookings', () => BookingDateFactory)
  .relation('choices', () => BookingChoiceFactory)
  .build()
