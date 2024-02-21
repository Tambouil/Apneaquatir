// App/Models/Month.ts

import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Availability from './availability.js'
import { DateTime } from 'luxon'

import type { HasMany } from '@adonisjs/lucid/types/relations'
import type { Opaque } from '@adonisjs/core/types/helpers'

export type MonthId = Opaque<'MonthId', string>

export default class Month extends BaseModel {
  @column({ isPrimary: true })
  declare id: MonthId

  @column.date({ columnName: 'month_date' })
  declare monthDate: DateTime

  @hasMany(() => Availability)
  declare availabilities: HasMany<typeof Availability>
}
