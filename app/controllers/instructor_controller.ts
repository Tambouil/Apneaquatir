import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import Availability from '#models/availability'
import { AvailabilityPresenter } from '../presenters/availability.js'
import User from '#models/user'
import { UserRole } from '#enums/user_role'

@inject()
export default class InstructorController {
  constructor(private availabilityPresenter: AvailabilityPresenter) {}

  async index({ inertia }: HttpContext) {
    const availabilities = await Availability.query()
      .select('dateAvailable', 'training')
      .where('isArchived', false)
      .orderBy('dateAvailable', 'asc')

    const formattedAvailabilities = this.availabilityPresenter.json(availabilities)

    const allMonitors = await User.query().where('role', UserRole.User)

    return inertia.render('instructor', {
      availabilities: formattedAvailabilities,
      allMonitors,
    })
  }
}
