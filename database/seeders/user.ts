import db from '@adonisjs/lucid/services/db'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'
import { BookingDateFactory } from '#database/factories/booking_date_factory'
import { UserFactory } from '#database/factories/user_factory'

export default class DatabaseSeeder {
  async run() {
    const trx = await db.transaction()
    await this.seedUsersAndContent(trx)
    await trx.commit()
  }

  async seedUsersAndContent(trx: TransactionClientContract) {
    const baseUser = UserFactory.client(trx).merge([
      {
        firstName: 'Valentin',
        lastName: 'Berceaux',
        email: 'valentin@mail.com',
        password: 'secret',
      },
    ])
    const admin = await baseUser.create()

    await BookingDateFactory.client(trx)
      .merge({ userId: admin.id })
      .with('userChoices', 1, (response) => response.merge({ userId: admin.id }))
      .create()

    await UserFactory.client(trx).merge({ password: 'secret' }).createMany(5)
  }
}
