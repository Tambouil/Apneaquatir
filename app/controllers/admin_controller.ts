import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class AdminController {
  async index({ inertia }: HttpContext) {
    const users = await User.all()

    return inertia.render('admin', { users })
  }

  async update({ request, response, params }: HttpContext) {
    const { id } = params
    const { usersId, roles } = request.only(['roles', 'usersId'])

    const user = await User.findOrFail(id)
    user.role = roles[usersId.indexOf(id)]
    await user.save()

    return response.redirect().back()
  }

  async destroy({ request, response }: HttpContext) {
    const { id } = request.params()

    const user = await User.findOrFail(id)
    await user.delete()

    return response.redirect().back()
  }
}
