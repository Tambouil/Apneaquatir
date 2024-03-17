import BookingDate from '#models/booking_date'

export default class DateService {
  // get all dates available
  async getAllDatesAvailable() {
    return await BookingDate.query()
      .select('id', 'dateAvailable')
      .where('isArchived', false)
      .orderBy('dateAvailable', 'asc')
  }
}
