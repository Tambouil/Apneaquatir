import { Header } from '#views/components/layout/header'
import { Layout } from '#views/layouts/app'

export function Home() {
  return (
    <Layout>
      <Header />
      <h1 class="text-3xl font-bold underline text-red-500">Hello World</h1>
    </Layout>
  )
}
