import { csrfField, route } from '#start/view'
import { HttpContext } from '@adonisjs/core/http'

export const Header = () => {
  const { auth } = HttpContext.getOrFail()
  return (
    <header>
      <span>
        {auth.isAuthenticated ? (
          <form action={route('auth.logout') + '?_method=delete'} method="post">
            {csrfField()}
            <button type="submit">Logout</button>
          </form>
        ) : (
          <>
            <a href={route('auth.login')}>Login</a>
            <a href={route('auth.register')}>Register</a>
          </>
        )}
      </span>
    </header>
  )
}
