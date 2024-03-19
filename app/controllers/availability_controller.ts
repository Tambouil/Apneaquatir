import Availability from '#models/availability'
import { HttpContext } from '@adonisjs/core/http'

interface DateWithTraining {
  date: Date
  trainings: string[]
}

export default class AvailabilityController {
  async index({ inertia }: HttpContext) {
    return inertia.render('availability')
  }

  async store({ request, response }: HttpContext) {
    const { datesWithTrainings } = request.only(['datesWithTrainings'])

    const records = datesWithTrainings.map((dateWithTraining: DateWithTraining) => {
      return {
        dateAvailable: dateWithTraining.date,
        training: dateWithTraining.trainings,
      }
    })

    await Availability.query().where('isArchived', false).update({ isArchived: true })

    await Availability.createMany(records)

    return response.redirect().toPath('/instructor')
  }
}
