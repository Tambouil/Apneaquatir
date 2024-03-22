import type { UserId } from '#models/user'
import type { AvailabilityDateId } from '#models/availability_date'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Training, { type TrainingId } from '#models/training'
import AvailabilityDate from '#models/availability_date'
import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { Opaque } from '@adonisjs/core/types/helpers'

export type InstructoravailabilityId = Opaque<'InstructoravailabilityId', string>

export default class InstructorAvailability extends BaseModel {
  @column({ isPrimary: true })
  declare id: InstructoravailabilityId

  @column()
  declare instructorId: UserId

  @column()
  declare dateId: AvailabilityDateId

  @column()
  declare trainingId: TrainingId

  @column()
  declare availability: number

  @column({ consume: (value) => !!value })
  declare isArchived: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'instructorId',
  })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => AvailabilityDate, {
    foreignKey: 'dateId',
  })
  declare availabilityDate: BelongsTo<typeof AvailabilityDate>

  @belongsTo(() => Training)
  declare training: BelongsTo<typeof Training>
}
