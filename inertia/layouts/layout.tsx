import { Head } from '@inertiajs/react'

interface Props {
  title: string
  children: JSX.Element
}

export const Layout = ({ title, children }: Props) => {
  return (
    <div className="font-sans mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
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
      <footer className="border-t border-gray-300 text-sm">
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
    </div>
  )
}
