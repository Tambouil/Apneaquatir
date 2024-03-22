import { UserRole } from '#enums/user_role'
import AvailabilityDate from '#models/availability_date'
import User from '#models/user'

export default class InstructorService {
  async getAvailabilitiesDates(currentInstructor: User) {
    return await AvailabilityDate.query()
      .select('id', 'dateAvailable')
      .where('isArchived', false)
      .orderBy('dateAvailable', 'asc')
      .preload('trainingAvailabilities', (query) => {
        query.where('isArchived', false).preload('training')
      })
      .preload('instructorAvailabilities', (query) => {
        query
          .where('isArchived', false)
          .where('instructorId', currentInstructor.id)
          .select('id', 'dateId', 'trainingId', 'availability')
      })
  }

  async getInstructorAvailabilities(instructor: User, availabilityPresenter: any) {
    const availabilities = await this.getAvailabilitiesDates(instructor)

    return availabilities.map((availability) => ({
      id: availability.id,
      date: availabilityPresenter.format(availability.dateAvailable),
      trainings: availability.trainingAvailabilities.map((ta) => {
        const instructorAvailability = availability.instructorAvailabilities.find(
          (ia) => ia.trainingId === ta.training.id
        )

        return {
          id: ta.training.id,
          name: availabilityPresenter.translateTraining(ta.training.name),
          availability: instructorAvailability ? instructorAvailability.availability : null,
        }
      }),
    }))
  }

  async getOtherInstructorsWithAvailabilities(currentInstructor: User) {
    return await User.query()
      .where('id', '<>', currentInstructor.id)
      .where('role', UserRole.Instructor)
      .preload('instructorAvailabilities', (query) => {
        query.where('isArchived', false)
      })
  }
}
