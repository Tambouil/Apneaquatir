import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

import type { Opaque } from '@adonisjs/core/types/helpers'

export type BookingDatesId = Opaque<'BookingDatesId', string>

export default class BookingDates extends BaseModel {
  @column({ isPrimary: true })
  declare id: BookingDatesId

  @column()
  declare batchId: string

  @column()
  declare dateAvailable: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
