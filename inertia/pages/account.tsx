import React from 'react'
import User from '#models/user'
import { useForm, usePage } from '@inertiajs/react'
import { Separator } from '../components/ui/separator'
import { SettingsLayout } from '../layouts/settings_layout'
import { Button, buttonVariants } from '../components/ui/button'
import { Icons } from '../components/icon'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '../components/ui/alert_dialog'

export default function Account() {
  const [showAlertDialog, setShowAlertDialog] = React.useState(false)
  const { user } = usePage<{ user: User }>().props
  const { delete: destroy, processing } = useForm()

  function handleDelete(event: React.FormEvent) {
    event.preventDefault()
    setShowAlertDialog(true)
  }

  return (
    <SettingsLayout title="Paramètres">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Compte</h3>
          <p className="text-sm text-muted-foreground">
            Vous trouverez ici toutes les options relatives à votre compte
          </p>
        </div>
        <Separator />

        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Supprimer votre compte</h4>
            <p className="text-sm text-muted-foreground">
              Une fois que vous aurez supprimé votre compte, toutes vos données seront perdues. Vous
              ne pourrez pas annuler cette action.
            </p>
          </div>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <form onSubmit={handleDelete}>
              <Button
                type="submit"
                variant="destructive"
                disabled={processing}
                className="space-y-8"
              >
                Supprimer votre compte
                {processing && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              </Button>
            </form>
          </AlertDialogTrigger>
          {showAlertDialog && (
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Attention</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir supprimer votre compte ? <br />
                <br />
                <span className="underline">
                  Cette action est irréversible et toutes vos données seront perdues.
                </span>
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setShowAlertDialog(false)}>
                  Annuler
                </AlertDialogCancel>
                <AlertDialogAction
                  className={buttonVariants({ variant: 'destructive' })}
                  onClick={() => {
                    setShowAlertDialog(false)
                    destroy('/users/' + user.id)
                  }}
                >
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          )}
        </AlertDialog>
      </div>
    </SettingsLayout>
  )
}
