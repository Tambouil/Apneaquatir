import BookingResponse from '#models/booking_response'
import Factory from '@adonisjs/lucid/factories'
import { UserFactory } from './user_factory.js'
import { BookingDateFactory } from './booking_date_factory.js'
import { UserChoices } from '#enums/user_choices'

export const BookingResponseFactory = Factory.define(BookingResponse, ({ faker }) => {
  return {
    userParticipation: faker.helpers.enumValue(UserChoices),
  }
})
  .relation('user', () => UserFactory)
  .relation('bookingDate', () => BookingDateFactory)
  .build()
