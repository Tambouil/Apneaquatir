import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { Opaque } from '@adonisjs/core/types/helpers'
import User, { type UserId } from '#models/user'
import BookingDate, { type BookingDateId } from '#models/booking_date'
import { DateTime } from 'luxon'

export type BookingChoiceId = Opaque<'BookingChoiceId', string>

export default class BookingChoice extends BaseModel {
  @column({ isPrimary: true })
  declare id: BookingChoiceId

  @column()
  declare userId: UserId

  @column()
  declare bookingDateId: BookingDateId

  @column()
  declare userChoice: number

  @column({ consume: (value) => !!value })
  declare isArchived: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => BookingDate)
  declare bookingDate: BelongsTo<typeof BookingDate>
}
