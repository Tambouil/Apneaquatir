import Role from '#enums/roles'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('gen_random_uuid()').knexQuery)
      table.string('full_name').nullable()
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.integer('role_id').unsigned().notNullable().defaultTo(Role.USER)

      table.timestamp('created_at', { useTz: false }).notNullable()
      table.timestamp('updated_at', { useTz: false }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
