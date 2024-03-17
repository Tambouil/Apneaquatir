import BookingDate from '#models/booking_date'
import Factory from '@adonisjs/lucid/factories'
import { DateTime } from 'luxon'
import { UserFactory } from './user_factory.js'
import { BookingChoiceFactory } from './booking_choice_factory.js'

export const BookingDateFactory = Factory.define(BookingDate, () => {
  return {
    dateAvailable: DateTime.now()
      .plus({ days: Math.floor(Math.random() * 30) })
      .endOf('day')
      .toUTC(),
  }
})
  .relation('user', () => UserFactory)
  .relation('userChoices', () => BookingChoiceFactory)
  .build()
