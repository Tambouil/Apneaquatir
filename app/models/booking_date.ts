import type { HasMany } from '@adonisjs/lucid/types/relations'
import type { Opaque } from '@adonisjs/core/types/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import BookingResponse from './booking_response.js'

export type BookingDatesId = Opaque<'BookingDatesId', string>

export default class BookingDates extends BaseModel {
  @column({ isPrimary: true })
  declare id: BookingDatesId

  @column.dateTime()
  declare dateAvailable: DateTime

  @column({ consume: (value) => !!value })
  declare isArchived: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => BookingResponse)
  declare userResponses: HasMany<typeof BookingResponse>
}
