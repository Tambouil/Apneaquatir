import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { DatePresenter } from '../presenters/dates.js'
import UserService from '#services/user_service'
import DateService from '#services/date_service'

@inject()
export default class HomeController {
  constructor(
    private userService: UserService,
    private dateService: DateService,
    private datePresenter: DatePresenter
  ) {}

  async index({ inertia, response, auth }: HttpContext) {
    const currentUser = auth.getUserOrFail()

    if (!currentUser) {
      return response.unauthorized()
    }

    const currentDatesAvailable = await this.dateService.getAllDatesAvailable()
    const formattedDates = this.datePresenter.formatDates(currentDatesAvailable)

    const users = await this.userService.getAllUsers(currentUser)
    const currentUserWithChoices = await this.userService.getCurrentUserWithChoicesAndDates(
      currentUser,
      currentDatesAvailable
    )

    return inertia.render('home', {
      datesAvailable: formattedDates,
      users,
      currentUser: currentUserWithChoices,
    })
  }
}
