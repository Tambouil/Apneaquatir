import type { Opaque } from '@adonisjs/core/types/helpers'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import type { AvailabilityDateId } from '#models/availability_date'
import type { TrainingId } from '#models/training'
import User, { type UserId } from '#models/user'
import Training from '#models/training'
import AvailabilityDate from '#models/availability_date'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export type TrainingAvailabilityId = Opaque<'TrainingAvailabilityId', string>

export default class TrainingAvailability extends BaseModel {
  @column({ isPrimary: true })
  declare id: TrainingAvailabilityId

  @column()
  declare userId: UserId

  @column()
  declare availabilityDateId: AvailabilityDateId

  @column()
  declare trainingId: TrainingId

  @column({ consume: (value) => !!value })
  declare isArchived: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => AvailabilityDate)
  declare availabilityDate: BelongsTo<typeof AvailabilityDate>

  @belongsTo(() => Training)
  declare training: BelongsTo<typeof Training>
}
