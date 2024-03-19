import { Separator } from '../components/ui/separator'
import { DatePicker } from '../components/date_picker'
import { SettingsLayout } from '../layouts/settings_layout'

export default function Booking() {
  const sidebarNavItems = [
    { href: '/booking/dates', title: 'Fosse Loïc Leferme' },
    { href: '', title: 'Disponibilités moniteurs' },
  ]

  return (
    <SettingsLayout title="Gestion" sidebarNavItems={sidebarNavItems}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Fosse Loïc Leferme</h3>
          <p className="text-sm text-muted-foreground">
            Remplacer le tableau actuel par de nouvelles dates. Attention, le tableau actuel sera
            archivé.
          </p>
        </div>
        <Separator />
        <DatePicker className="flex-col" />
      </div>
    </SettingsLayout>
  )
}
