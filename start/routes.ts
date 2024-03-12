/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const HomeController = () => import('#controllers/home_controller')
const LoginController = () => import('#controllers/login_controller')
const RegisterController = () => import('#controllers/register_controller')
const BookingDatesController = () => import('#controllers/booking_dates_controller')
const BookingResponsesController = () => import('#controllers/booking_responses_controller')

router
  .group(() => {
    router.get('/', [HomeController, 'create'])
    router.get('/booking', [HomeController, 'show'])
    router.delete('logout', [LoginController, 'destroy'])
    router.post('/booking', [BookingDatesController, 'store'])
    router.post('/booking/choices', [BookingResponsesController, 'store'])
  })
  .middleware([middleware.auth()])

router
  .group(() => {
    router.get('register', [RegisterController, 'create'])
    router.post('register', [RegisterController, 'store'])
    router.get('login', [LoginController, 'create'])
    router.post('login', [LoginController, 'store'])
  })
  .middleware([middleware.guest()])
