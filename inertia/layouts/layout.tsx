import React from 'react'
import { Head } from '@inertiajs/react'
import { Toaster } from '../components/ui/toaster'
import { Separator } from '../components/ui/separator'

interface Props {
  title: string
  children: React.ReactNode
}

export const Layout = ({ title, children }: Props) => {
  return (
    <div className="font-sans container px-4 sm:px-6 lg:px-8">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="/favicon.ico" rel="icon" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <title>{title}</title>
      </Head>
      {children}
      <Separator />
      <footer className="text-sm">
        <div className="flex items-center justify-between h-24">
          <p>
            <a href="" className="font-medium underline">
              Source code
            </a>
          </p>
          <p>
            <span>Made by</span>
            <a href="" className="font-medium underline">
              {' '}
              Valentin Berceaux
            </a>
          </p>
        </div>
      </footer>
      <Toaster />
    </div>
  )
}
