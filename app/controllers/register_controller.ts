import User from '#models/user'
import { createRegisterValidator } from '#validators/user'
import { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  async create({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  async store({ auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(createRegisterValidator)
    const user = await User.create(payload)
    await auth.use('web').login(user)

    return response.redirect('/')
  }
}
