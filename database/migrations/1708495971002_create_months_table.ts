import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'months'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.date('month_date').unique().notNullable()

      table.timestamp('created_at', { useTz: false })
      table.timestamp('updated_at', { useTz: false })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
