import { Head } from '@inertiajs/react'
import { Separator } from '~/components/ui/separator'
import { SettingsSidebar } from '~/components/settings_sidebar'

interface Props {
  title: string
  subTitle: string
  description: string
  sidebarNavItems: { title: string; href: string }[]
  children: React.ReactNode
}

export const SettingsLayout = ({
  title,
  subTitle,
  description,
  children,
  sidebarNavItems,
}: Props) => {
  return (
    <>
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
      <div className="space-y-6 p-6 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">{subTitle}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SettingsSidebar items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}
