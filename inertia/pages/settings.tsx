import { FormEvent } from 'react'
import User from '#models/user'
import { useForm, usePage } from '@inertiajs/react'
import { Separator } from '../components/ui/separator'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { useToast } from '../components/ui/use_toast'
import { SettingsLayout } from '../layouts/settings_layout'

export default function Settings() {
  const { user } = usePage<{ user: User }>().props
  const { toast } = useToast()
  const { data, setData, put, processing, isDirty } = useForm({
    first_name: user.firstName,
    last_name: user.lastName,
    email: user.email,
    password: '',
  })

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    put('/users/' + user.id, {
      onSuccess: () => {
        toast({
          title: 'Votre profil a été mis à jour',
          description: 'Vous pouvez maintenant continuer à utiliser votre compte',
        })
      },
      onError: () => {
        toast({
          title: 'Une erreur est survenue',
          description: 'Veuillez réessayer',
        })
      },
    })
  }

  const sidebarNavItems = [
    {
      title: 'Profil',
      href: '/settings',
    },
    {
      title: 'Compte',
      href: '/account',
    },
  ]

  return (
    <SettingsLayout
      title="Paramètres"
      subTitle="Paramètres"
      description="Personnalisez les paramètres de votre compte"
      sidebarNavItems={sidebarNavItems}
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Profil</h3>
          <p className="text-sm text-muted-foreground">
            Mettez à jour vos informations personnelles
          </p>
        </div>
        <Separator />
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="first_name" className="block text-sm font-medium">
                Prénom
              </Label>
              <Input
                id="first_name"
                type="text"
                className="w-full"
                value={data.first_name}
                onChange={(e) => setData('first_name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name" className="block text-sm font-medium">
                Nom
              </Label>
              <Input
                id="last_name"
                type="text"
                className="w-full"
                value={data.last_name}
                onChange={(e) => setData('last_name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                className="w-full"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
              />
              <p className="text-[0.8rem] text-muted-foreground">
                Votre adresse email est utilisée pour vous connecter à votre compte
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="block text-sm font-medium">
                Mot de passe
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Nouveau mot de passe"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={processing}
                minLength={6}
                className="w-full"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
              />
              <p className="text-[0.8rem] text-muted-foreground">
                Laissez le champ vide si vous ne souhaitez pas changer de mot de passe
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={!isDirty || processing}>
              Enregistrer
            </Button>
          </div>
        </form>
      </div>
    </SettingsLayout>
  )
}
