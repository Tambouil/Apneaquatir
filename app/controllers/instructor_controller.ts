import AvailabilityDate from '#models/availability_date'
import InstructorAvailability from '#models/instructor_availability'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { AvailabilityPresenter } from '../presenters/availability.js'
import User from '#models/user'
import { UserRole } from '#enums/user_role'

@inject()
export default class InstructorController {
  constructor(private availabilityPresenter: AvailabilityPresenter) {}

  async index({ inertia, auth, response }: HttpContext) {
    const currentInstructor = auth.getUserOrFail()

    if (!currentInstructor) {
      return response.unauthorized()
    }
    const translateTraining = (training: string) => {
      switch (training) {
        case 'static':
          return 'Statique'
        case 'dynamic':
          return 'Dynamique'
        case 'space':
          return 'Espace proche'
        case 'pool':
          return 'Fosse'
        default:
          return 'Statique'
      }
    }

    const availabilities = await AvailabilityDate.query()
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

    const tableHead = availabilities.map((availability) => ({
      id: availability.id,
      date: this.availabilityPresenter.format(availability.dateAvailable),
      trainings: availability.trainingAvailabilities.map((ta) => {
        const instructorAvailability = availability.instructorAvailabilities.find(
          (ia) => ia.trainingId === ta.training.id
        )

        return {
          id: ta.training.id,
          name: translateTraining(ta.training.name),
          availability: instructorAvailability ? instructorAvailability.availability : null,
        }
      }),
    }))

    const otherInstructorsWithAvailabilities = await User.query()
      .where('id', '<>', currentInstructor.id)
      .where('role', UserRole.Instructor)
      .preload('instructorAvailabilities', (query) => {
        query.where('isArchived', false)
      })

    return inertia.render('instructor', {
      availabilities: availabilities,
      tableHead,
      otherInstructors: otherInstructorsWithAvailabilities,
    })
  }

  async store({ request, response, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    if (!user) {
      return response.unauthorized()
    }

    const data = request.only(['availabilities'])

    const records = data.availabilities.flatMap((date: any) =>
      date.trainings.map((training: any) => ({
        dateId: date.id,
        instructorId: user.id,
        trainingId: training.id,
        availability: training.availability,
      }))
    )

    await InstructorAvailability.updateOrCreateMany(
      ['dateId', 'trainingId', 'instructorId'],
      records
    )

    return response.redirect().back()
  }
}
