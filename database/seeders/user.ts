import db from '@adonisjs/lucid/services/db'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'
import { BookingDateFactory } from '#database/factories/booking_date_factory'
import { UserFactory } from '#database/factories/user_factory'
import { BookingChoiceFactory } from '#database/factories/booking_choice_factory'

export default class DatabaseSeeder {
  async run() {
    const trx = await db.transaction()
    await this.seedUsersAndContent(trx)
    await trx.commit()
  }

  async seedUsersAndContent(trx: TransactionClientContract) {
    const baseAdmin = UserFactory.client(trx).merge([
      {
        firstName: 'Valentin',
        lastName: 'Berceaux',
        email: 'valentin@mail.com',
        password: 'secret',
      },
    ])
    const admin = await baseAdmin.create()

    const bookingDates = await BookingDateFactory.client(trx)
      .merge({ userId: admin.id })
      .with('userChoices', 1, (response) => response.merge({ userId: admin.id }))
      .createMany(3)

    const baseUsers = UserFactory.client(trx).merge({
      password: 'secret',
    })

    const otherUsers = await baseUsers.createMany(10)

    for (const user of otherUsers) {
      for (const bookingDate of bookingDates) {
        await BookingChoiceFactory.client(trx)
          .merge({
            userId: user.id,
            bookingDateId: bookingDate.id,
          })
          .create()
      }
    }

    // let promises = []
    // for (const user of otherUsers) {
    //   for (const bookingDate of bookingDates) {
    //     const promise = BookingChoiceFactory.client(trx)
    //       .merge({
    //         userId: user.id,
    //         bookingDateId: bookingDate.id,
    //       })
    //       .create()
    //     promises.push(promise)
    //   }
    // }

    // await Promise.all(promises)
  }
}
