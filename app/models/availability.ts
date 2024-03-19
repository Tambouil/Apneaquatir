import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { Opaque } from '@adonisjs/core/types/helpers'

export type AvailabilityId = Opaque<'AvailabilityId', string>

export default class Availability extends BaseModel {
  @column({ isPrimary: true })
  declare id: AvailabilityId

  @column.dateTime()
  declare dateAvailable: DateTime

  @column({ prepare: (value) => JSON.stringify(value) })
  declare training: string[]

  @column({ consume: (value) => value === !!value })
  declare isArchived: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
