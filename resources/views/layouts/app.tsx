import { Vite } from '#start/view'
import { Header } from '#views/components/layout/header'
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

          <title>Apneaquatir | Réservation de la fosse</title>

          <Vite.Entrypoint entrypoints={['resources/css/app.css', 'resources/js/app.js']} />
        </head>
        <body>
          <>
            <Header />
            {children}
          </>
        </body>
      </html>
    </>
  )
}
