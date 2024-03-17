import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class LoginController {
  async create({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async store({ request, response, auth, session }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)

      return response.redirect().toPath('/')
    } catch (error) {
      session.flash('errors.auth', 'Identifiants invalides')
      return response.redirect().back()
    }
  }

  async destroy({ response, auth }: HttpContext) {
    await auth.use('web').logout()

    return response.redirect('/login')
  }
}
