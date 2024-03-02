import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  renderView({ view }: HttpContext) {
    return view.render('pages/auth/login')
  }

  async handleForm({ auth, request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user)

    return response.redirect('/')
  }
}
