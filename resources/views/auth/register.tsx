// import { csrfField, route } from '#start/view'
// import { Button } from '#views/components/button'
// import { InputGroup } from '#views/components/form/input_group'
// import { Layout } from '#views/layouts/app'

// const register = () => {
//   return (
//     <Layout>
//       <h1>Register</h1>

//       <form action={route('auth.register')} method="post">
//         {csrfField()}
//         <InputGroup label="email" name="email" type="email" />
//         <InputGroup label="password" name="password" type="password" />

//         <Button type="submit">Register</Button>
//       </form>
//     </Layout>
//   )
// }

// export default register

import { Vite, csrfField, route } from '#start/view'
import { Layout } from '#views/layouts/app'

const register = () => {
  return (
    <Layout>
      <main class="bg-login h-screen">
        <section class="relative flex flex-wrap lg:h-screen lg:items-center">
          <div class="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
            <div class="mx-auto max-w-lg text-center">
              <h1 class="text-2xl font-bold sm:text-3xl">Fosse Apnéaquatir</h1>

              <p class="mt-4 text-gray-500">
                Bienvenue sur l'application de réservation liée aux séances du club Apneaquatir
              </p>
            </div>

            <form
              action={route('auth.register')}
              method="post"
              class="mx-auto mb-0 mt-8 max-w-md space-y-4"
            >
              {csrfField()}
              <div>
                <label for="full_name" class="sr-only">
                  Nom complet
                </label>

                <div class="relative">
                  <input
                    id="full_name"
                    name="full_name"
                    type="text"
                    class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Entrer votre nom complet"
                  />

                  <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="size-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <div>
                <label for="email" class="sr-only">
                  Email
                </label>

                <div class="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Entrer votre email"
                  />

                  <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="size-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <div>
                <label for="password" class="sr-only">
                  Mot de passe
                </label>

                <div class="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Entrer votre mot de passe"
                  />

                  <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="size-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <div>
                <label for="password" class="sr-only">
                  Confirmer votre mot de passe
                </label>

                <div class="relative">
                  <input
                    id="confirm_password"
                    name="confirm_password" // Ajoutez un attribut "name"
                    type="password"
                    class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Confirmer votre mot de passe"
                  />

                  <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="size-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <p class="text-sm text-gray-500">
                  Déjà membre ?
                  <a class="underline" href={route('auth.login')}>
                    {} Se connecter
                  </a>
                </p>

                <button
                  type="submit"
                  class="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                >
                  S'inscrire
                </button>
              </div>
            </form>
          </div>

          <div class="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
            {Vite.Image({
              src: 'resources/images/login.jpg',
              alt: 'hero image',
              class: 'absolute inset-0 h-full w-full object-cover',
            })}
          </div>
        </section>
      </main>
    </Layout>
  )
}

export default register
