import { Vite } from '#start/view'

import type { Children } from '@kitajs/html'

interface LayoutProps {
  children: Children
}

export function Layout(props: LayoutProps) {
  const { children } = props

  return (
    <>
      {'<!DOCTYPE html>'}
      <html lang="fr">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="/assets/favicon.ico" rel="icon" type="image/x-icon" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
            rel="stylesheet"
          />
          <script src="https://cdn.jsdelivr.net/npm/alpinejs@2.x.x/dist/alpine.js" defer></script>
          <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
          <script src="https://cdn.jsdelivr.net/npm/flatpickr/dist/l10n/fr.js"></script>

          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css"
          />

          <title>Apneaquatir | Réservation de la fosse</title>

          <Vite.Entrypoint entrypoints={['resources/css/app.css', 'resources/js/app.js']} />
        </head>
        <body class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <>{children}</>
        </body>
      </html>
    </>
  )
}
