import { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  async renderView({ inertia }: HttpContext) {
    return inertia.render('home')
  }
}
