import type { Opaque } from '@adonisjs/core/types/helpers'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import TrainingAvailability from '#models/training_availability'
import Instructoravailability from '#models/instructor_availability'

export type TrainingId = Opaque<'TrainingId', string>

export default class Training extends BaseModel {
  @column({ isPrimary: true })
  declare id: TrainingId

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => TrainingAvailability)
  declare trainingAvailabilities: HasMany<typeof TrainingAvailability>

  @hasMany(() => Instructoravailability)
  declare instructorAvailabilities: HasMany<typeof Instructoravailability>
}
