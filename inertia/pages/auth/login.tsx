import type { FormEvent } from 'react'
import { Link, useForm, usePage } from '@inertiajs/react'
import { AuthLayout } from '~/layouts/auth_layout'
import { Icons } from '~/components/icon'
import { Button, buttonVariants } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'

export default function Login() {
  const flash: any = usePage().props.flash
  const { data, setData, post, processing } = useForm({
    email: '',
    password: '',
  })

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    post('/login')
  }

  return (
    <AuthLayout
      title="Se connecter"
      heading="Se connecter"
      description="Entrez vos identifiants ci-dessous pour accéder au module de réservation"
    >
      <div className="grid gap-6">
        <form onSubmit={handleSubmit}>
          {flash.errors?.auth && (
            <div
              role="alert"
              className="col-span-6 bg-red-100 text-red-800 text-sm rounded p-3 mb-4"
            >
              <p className="text-base font-medium">{flash.errors.auth}</p>
            </div>
          )}
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="nom@exemple.com"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={processing}
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="password">
                Mot de passe
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="mot de passe"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={processing}
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
              />
            </div>
            <Button type="submit" disabled={processing}>
              {processing && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Se connecter
            </Button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Nouveau sur la plateforme ?
            </span>
          </div>
        </div>
        <Link
          href="/register"
          className={buttonVariants({ variant: 'outline', className: 'text-primary' })}
        >
          Créer un compte
        </Link>
      </div>
    </AuthLayout>
  )
}
