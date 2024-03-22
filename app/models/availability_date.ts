import type { Opaque } from '@adonisjs/core/types/helpers'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import User, { type UserId } from '#models/user'
import TrainingAvailability from '#models/training_availability'
import InstructorAvailability from '#models/instructor_availability'

export type AvailabilityDateId = Opaque<'AvailabilityDateId', string>

export default class AvailabilityDate extends BaseModel {
  @column({ isPrimary: true })
  declare id: AvailabilityDateId

  @column()
  declare userId: UserId

  @column.dateTime()
  declare dateAvailable: DateTime

  @column({ consume: (value) => value === !!value })
  declare isArchived: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => TrainingAvailability, {
    foreignKey: 'availabilityDateId',
  })
  declare trainingAvailabilities: HasMany<typeof TrainingAvailability>

  @hasMany(() => InstructorAvailability, {
    foreignKey: 'dateId',
  })
  declare instructorAvailabilities: HasMany<typeof InstructorAvailability>
}
