import User from '#models/user'
import Login from '#views/auth/login'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  renderView() {
    return <Login />
  }

  async handleForm({ auth, request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user)

    return response.redirect('/')
  }
}
