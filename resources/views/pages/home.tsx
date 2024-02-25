import { Header } from '#views/components/layout/header'
import Modal from '#views/components/modal'
import { Layout } from '#views/layouts/app'

export function Home() {
  return (
    <Layout>
      <Header />
      <h1 class="text-3xl font-bold underline text-center">Home</h1>

      <Modal buttonTitle="Nouveau mois" title="Choisir les dates de réservations" />
    </Layout>
  )
}
