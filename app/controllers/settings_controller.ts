import { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'

export default class ProfileController {
  async index({ inertia }: HttpContext) {
    return inertia.render('settings')
  }

  async update({ request, response, params }: HttpContext) {
    const payload = request.only(['first_name', 'last_name', 'email', 'password'])

    if (!payload.password) {
      delete payload.password
    }

    const user = await User.findByOrFail('id', params.id)
    user.merge(payload)
    await user.save()
    response.redirect().back()
  }
}
