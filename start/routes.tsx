/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { Home } from '#views/pages/home'
import { middleware } from './kernel.js'

const RegisterController = () => import('#controllers/register.controller')
const LoginController = () => import('#controllers/login.controller')
const LogoutController = () => import('#controllers/logout.controller')

const BookingDatesController = () => import('#controllers/booking_dates.controller')

router.get('/', async () => {
  return <Home />
})

router
  .group(() => {
    router.delete('logout', [LogoutController]).as('auth.logout')
  })
  .middleware([middleware.auth()])
router
  .group(() => {
    router.get('register', [RegisterController, 'renderView'])
    router.post('register', [RegisterController, 'handleForm']).as('auth.register')
    router.get('login', [LoginController, 'renderView'])
    router.post('login', [LoginController, 'handleForm']).as('auth.login')
    router.post('/', [BookingDatesController, 'create']).as('booking.create')
  })
  .middleware([middleware.guest()])
