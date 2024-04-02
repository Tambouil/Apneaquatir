import { type FormEvent } from 'react'
import { AuthLayout } from '~/layouts/auth_layout'
import { Label } from '~/components/ui/label'
import { Input } from '~/components/ui/input'
import { Button, buttonVariants } from '~/components/ui/button'
import { Icons } from '~/components/icon'
import { Link, useForm } from '@inertiajs/react'

export default function Register() {
  const { data, setData, post, errors, processing } = useForm({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    post('/register')
  }

  return (
    <AuthLayout
      title="Inscription"
      heading="Créer un compte"
      description="Entrez vos informations personnelles ci-dessous pour vous inscrire à la plateforme"
    >
      <div className="grid gap-6">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-2  grid-cols-1 lg:grid-cols-2">
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="firstName">
                  Prénom
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="prénom"
                  disabled={processing}
                  value={data.firstName}
                  onChange={(e) => setData('firstName', e.target.value)}
                />
                {errors.firstName && (
                  <span className="text-red-500 text-sm mt-1 font-medium block">
                    {errors.firstName}
                  </span>
                )}
              </div>
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="lastName">
                  Nom
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="nom"
                  disabled={processing}
                  value={data.lastName}
                  onChange={(e) => setData('lastName', e.target.value)}
                />
                {errors.lastName && (
                  <span className="text-red-500 text-sm mt-1 font-medium block">
                    {errors.lastName}
                  </span>
                )}
              </div>
            </div>

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
              {errors.email && (
                <span className="text-red-500 text-sm mt-1 font-medium block">{errors.email}</span>
              )}
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
              {errors.password && (
                <span className="text-red-500 text-sm mt-1 font-medium block">
                  {errors.password}
                </span>
              )}
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="passwordConfirmation">
                Confirmer le mot de passe
              </Label>
              <Input
                id="passwordConfirmation"
                type="password"
                placeholder="confirmer le mot de passe"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={processing}
                value={data.passwordConfirmation}
                onChange={(e) => setData('passwordConfirmation', e.target.value)}
              />
              {errors.passwordConfirmation && (
                <span className="text-red-500 text-sm mt-1 font-medium block">
                  {errors.passwordConfirmation}
                </span>
              )}
            </div>
            <Button type="submit" disabled={processing}>
              {processing && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              S'inscrire
            </Button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Déjà inscrit ?</span>
          </div>
        </div>
        <Link
          href="/login"
          className={buttonVariants({ variant: 'outline', className: 'text-primary' })}
        >
          Se connecter
        </Link>
      </div>
    </AuthLayout>
  )
}
