import User from '#models/user'
import Register from '#views/auth/register'
import { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  renderView() {
    return <Register />
  }

  async handleForm({ auth, request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.create({ email, password })
    await auth.use('web').login(user)

    return response.redirect('/')
  }
}
