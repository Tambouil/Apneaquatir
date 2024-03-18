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
const BookingChoicesController = () => import('#controllers/booking_choices_controller')
const SettingsController = () => import('#controllers/settings_controller')
const AccountController = () => import('#controllers/account_controller')

router
  .group(() => {
    // home
    router.get('/', [HomeController, 'index'])

    // auth
    router.delete('logout', [LoginController, 'destroy'])

    // user settings
    router.get('/settings', [SettingsController, 'index'])
    router.get('/account', [AccountController, 'index'])
    router.put('/users/:id', [SettingsController, 'update'])
    router.delete('/users/:id', [AccountController, 'destroy'])

    // booking
    router.post('/booking/dates/:id', [BookingDatesController, 'store'])
    router.delete('/booking/dates/', [BookingDatesController, 'destroy'])
    router.post('/booking/choices/:id', [BookingChoicesController, 'store'])
  })
  .middleware([middleware.auth()])

router
  .group(() => {
    // auth
    router.get('register', [RegisterController, 'create'])
    router.post('register', [RegisterController, 'store'])
    router.get('login', [LoginController, 'create'])
    router.post('login', [LoginController, 'store'])
  })
  .middleware([middleware.guest()])
