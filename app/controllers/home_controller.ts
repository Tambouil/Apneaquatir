import BookingDates from '#models/booking_date'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { DatePresenter } from '../presenters/dates.js'

@inject()
export default class HomeController {
  constructor(private datePresenter: DatePresenter) {}

  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}

  /**
   * Display form to create a new record
   */
  async create({ inertia }: HttpContext) {
    const activeDates = await BookingDates.query()
      .select('id', 'dateAvailable')
      .where('isArchived', false)
      .orderBy('created_at', 'desc')

    return inertia.render('home', {
      datesAvailable: this.datePresenter.formatDates(activeDates),
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
