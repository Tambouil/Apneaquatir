import User from '#models/user'
import Register from '#views/auth/register'
import { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  renderView() {
    return <Register />
  }

  async handleForm({ auth, request, response }: HttpContext) {
    const { email, password, full_name } = request.only(['email', 'password', 'full_name'])

    const user = await User.create({ email, password, full_name })
    await auth.use('web').login(user)

    return response.redirect('/')
  }
}
