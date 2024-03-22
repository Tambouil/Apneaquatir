import AvailabilityDate from '#models/availability_date'
import InstructorAvailability from '#models/instructor_availability'
import Training from '#models/training'
import TrainingAvailability from '#models/training_availability'
import { HttpContext } from '@adonisjs/core/http'

export default class AvailabilityController {
  async index({ inertia }: HttpContext) {
    return inertia.render('availability')
  }

  async store({ request, response }: HttpContext) {
    const { trainingAvailabilities } = request.only(['trainingAvailabilities'])

    // archive all existing records.
    await AvailabilityDate.query().update({ isArchived: true })
    await TrainingAvailability.query().update({ isArchived: true })
    await InstructorAvailability.query().update({ isArchived: true })

    for (const dateWithTraining of trainingAvailabilities) {
      // create the AvailabilityDate record
      const availabilityDate = await AvailabilityDate.create({
        userId: dateWithTraining.userId,
        dateAvailable: dateWithTraining.date,
      })

      // create the TrainingAvailability records
      for (const trainingName of dateWithTraining.trainings) {
        // look up the Training by name to get its ID
        const training = await Training.firstOrCreate({ name: trainingName })

        await TrainingAvailability.create({
          userId: dateWithTraining.userId,
          availabilityDateId: availabilityDate.id,
          trainingId: training.id,
        })
      }
    }

    return response.redirect().toPath('/instructor')
  }
}
