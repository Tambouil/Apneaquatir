import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import type { Opaque } from '@adonisjs/core/types/helpers'
import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import User, { type UserId } from '#models/user'
import BookingChoice from '#models/booking_choice'

export type BookingDateId = Opaque<'BookingDateId', string>

export default class BookingDate extends BaseModel {
  @column({ isPrimary: true })
  declare id: BookingDateId

  @column()
  declare userId: UserId

  // @column.dateTime()
  // declare dateAvailable: DateTime

  // save date in Europe/Paris timezone
  @column.dateTime({ autoCreate: true, serializeAs: 'dateAvailable' })
  declare dateAvailable: DateTime

  @column({ consume: (value) => !!value })
  declare isArchived: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => BookingChoice)
  declare userChoices: HasMany<typeof BookingChoice>

  @beforeCreate()
  static async archiveOldDates() {
    await BookingDate.query().update({ isArchived: true })
    await BookingChoice.query().update({ isArchived: true })
  }
}
