import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { AvailabilityPresenter } from '../presenters/availability.js'
import InstructorAvailability from '#models/instructor_availability'
import InstructorService from '#services/instructor_service'

@inject()
export default class InstructorController {
  constructor(
    private availabilityPresenter: AvailabilityPresenter,
    private instructorService: InstructorService
  ) {}

  async index({ inertia, auth, response }: HttpContext) {
    const currentInstructor = auth.getUserOrFail()
    if (!currentInstructor) {
      return response.unauthorized()
    }

    const tableHead = await this.instructorService.getInstructorAvailabilities(
      currentInstructor,
      this.availabilityPresenter
    )

    const otherInstructorsWithAvailabilities =
      await this.instructorService.getOtherInstructorsWithAvailabilities(currentInstructor)

    return inertia.render('instructor', {
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
