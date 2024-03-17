import { UserChoices } from '#enums/user_choices'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'booking_choices'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.uuid('user_id').references('id').inTable('users').notNullable().onDelete('CASCADE')
      table
        .uuid('booking_date_id')
        .references('id')
        .inTable('booking_dates')
        .notNullable()
        .onDelete('CASCADE')
      table.integer('user_choice').notNullable().defaultTo(UserChoices.NotSpecified)
      table.boolean('is_archived').notNullable().defaultTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
