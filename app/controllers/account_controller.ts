import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AccountController {
  async index({ inertia }: HttpContext) {
    return inertia.render('account')
  }

  async destroy({ response, params }: HttpContext) {
    const { id } = params
    const user = await User.findOrFail(id)

    if (user.id !== id) {
      return response.unauthorized()
    }

    await user.delete()

    return response.redirect().toPath('/login')
  }
}
