import { BookingTable } from '#views/components/bookingDates/table'
import { Header } from '#views/components/layout/header'
import Modal from '#views/components/modal'
import { Layout } from '#views/layouts/app'

interface HomeProps {
  dates: { batchId: string; dates: string[] }[]
}
export function Home(props: HomeProps) {
  const { dates } = props
  return (
    <Layout>
      <Header />
      <h1 class="text-3xl font-bold underline text-center">Home</h1>

      <Modal buttonTitle="Nouveau mois" title="Choisir les dates de réservations" />

      <BookingTable dates={dates} />
    </Layout>
  )
}
