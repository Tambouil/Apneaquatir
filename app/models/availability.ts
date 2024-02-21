import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import Month from './month.js'

import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import type { UserId } from './user.js'
import type { Opaque } from '@adonisjs/core/types/helpers'

export type AvailabilityId = Opaque<'AvailabilityId', string>

export default class Availability extends BaseModel {
  @column({ isPrimary: true })
  declare id: AvailabilityId

  @column({ columnName: 'user_id' })
  declare userId: UserId

  @column.date({ columnName: 'availability_date' })
  declare availabilityDate: DateTime

  @column({ columnName: 'is_available' })
  declare isAvailable: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Month)
  declare month: BelongsTo<typeof Month>
}
