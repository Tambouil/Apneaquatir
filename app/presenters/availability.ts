import Availability from '#models/availability_date'
import { DateTime } from 'luxon'

export class AvailabilityPresenter {
  json(availabilities: Availability[]) {
    return availabilities.map((availability) => ({
      ...availability.toJSON(),
      dateAvailable: availability.dateAvailable
        .setZone('Europe/Paris')
        .setLocale('fr')
        .toFormat('EEEE dd MMMM'),
    }))
  }

  format(date: DateTime) {
    return date.setZone('Europe/Paris').setLocale('fr').toFormat('EEEE dd MMMM')
  }

  translateTraining(training: string) {
    switch (training) {
      case 'static':
        return 'Statique'
      case 'dynamic':
        return 'Dynamique'
      case 'space':
        return 'Espace proche'
      case 'pool':
        return 'Fosse'
      default:
        return 'Statique'
    }
  }
}
