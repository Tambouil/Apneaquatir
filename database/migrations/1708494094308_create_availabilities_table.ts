import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'availabilities'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.date('availability_date').notNullable()
      table.boolean('is_available').notNullable().defaultTo(true)

      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.uuid('month_id').references('id').inTable('users').onDelete('CASCADE')

      table.timestamp('created_at', { useTz: false })
      table.timestamp('updated_at', { useTz: false })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
