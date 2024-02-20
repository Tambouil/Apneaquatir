import { Vite } from '@adonisjs/vite'
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
          <link href="/assets/favicon.ico" rel="icon" type="image/x-icon"></link>

          <title>Apneaquatir | Réservation de la fosse</title>

          <Vite.Entrypoint entrypoints={['resources/css/app.scss', 'resources/js/app.js']} />
        </head>
        <body>{children}</body>
      </html>
    </>
  )
}
