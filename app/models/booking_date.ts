import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import type { Opaque } from '@adonisjs/core/types/helpers'
import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import BookingResponse from './booking_response.js'
import User, { type UserId } from './user.js'

export type BookingDateId = Opaque<'BookingDateId', string>

export default class BookingDate extends BaseModel {
  @column({ isPrimary: true })
  declare id: BookingDateId

  @column()
  declare userId: UserId

  @column.dateTime()
  declare dateAvailable: DateTime

  @column({ consume: (value) => !!value })
  declare isArchived: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => BookingResponse)
  declare userResponses: HasMany<typeof BookingResponse>

  @beforeCreate()
  static async archiveOldDates() {
    await BookingDate.query().update({ isArchived: true })
    await BookingResponse.query().update({ isArchived: true })
  }
}
