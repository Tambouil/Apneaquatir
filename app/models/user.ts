import type { Opaque } from '@adonisjs/core/types/helpers'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import hash from '@adonisjs/core/services/hash'
import { withAuthFinder } from '@adonisjs/auth'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import BookingChoice from '#models/booking_choice'
import BookingDate from '#models/booking_date'
import AvailabilityDate from '#models/availability_date'
import TrainingAvailability from '#models/training_availability'
import Instructoravailability from './instructor_availability.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export type UserId = Opaque<'UserId', string>

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: UserId

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare email: string

  @column()
  declare password: string

  @column()
  declare role: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => BookingDate)
  declare bookings: HasMany<typeof BookingDate>

  @hasMany(() => BookingChoice)
  declare choices: HasMany<typeof BookingChoice>

  @hasMany(() => AvailabilityDate)
  declare availabilities: HasMany<typeof AvailabilityDate>

  @hasMany(() => TrainingAvailability)
  declare trainingAvailabilities: HasMany<typeof TrainingAvailability>

  @hasMany(() => Instructoravailability, {
    foreignKey: 'instructorId',
  })
  declare instructorAvailabilities: HasMany<typeof Instructoravailability>
}
