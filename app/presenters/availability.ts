import Availability from '#models/availability'

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
}
