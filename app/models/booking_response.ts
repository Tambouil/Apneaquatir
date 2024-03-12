import type { UserId } from './user.js'
import type { BookingDatesId } from './booking_date.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { Opaque } from '@adonisjs/core/types/helpers'
import BookingDates from './booking_date.js'
import User from './user.js'

export type BookingResponseId = Opaque<'BookingResponseId', string>

export default class BookingResponse extends BaseModel {
  @column({ isPrimary: true })
  declare id: BookingResponseId

  @column()
  declare userId: UserId

  @column()
  declare bookingDateId: BookingDatesId

  @column()
  declare userParticipation: 'yes' | 'no' | 'not_specified'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => BookingDates)
  declare bookingDate: BelongsTo<typeof BookingDates>
}
