import BookingDates from '#models/booking_dates'
import { Home } from '#views/pages/home'

// export default class HomeController {
//   async renderView() {
//     const dates = await BookingDates.query()
//       .select('batchId')
//       .select('dateAvailable')
//       .groupBy('batchId', 'dateAvailable')

//     console.log(dates)

//     return <Home dates={dates} />
//   }
// }

export default class HomeController {
  async renderView() {
    const dates = await BookingDates.query()
      .select('batchId')
      .select('dateAvailable')
      .groupBy('batchId', 'dateAvailable')
      .distinct('batchId', 'dateAvailable')

    console.log(dates)

    const groupedDates = dates.reduce(
      (acc, booking) => {
        const foundBatch = acc.find((group) => group.batchId === booking.batchId)

        if (foundBatch) {
          foundBatch.dates.push(booking.dateAvailable)
        } else {
          acc.push({
            batchId: booking.batchId,
            dates: [booking.dateAvailable],
          })
        }

        return acc
      },
      [] as { batchId: string; dates: string[] }[]
    )

    console.log(groupedDates)

    return <Home dates={groupedDates} />
  }
}
