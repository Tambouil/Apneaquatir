import { UserChoices } from '#enums/user_choices'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'instructor_availabilities'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table
        .uuid('instructor_id')
        .references('id')
        .inTable('users')
        .notNullable()
        .onDelete('CASCADE')
      table
        .uuid('date_id')
        .references('id')
        .inTable('availability_dates')
        .notNullable()
        .onDelete('CASCADE')
      table
        .uuid('training_id')
        .references('id')
        .inTable('trainings')
        .notNullable()
        .onDelete('CASCADE')
      table.integer('availability').notNullable().defaultTo(UserChoices.NotSpecified)
      table.boolean('is_archived').defaultTo(false)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
