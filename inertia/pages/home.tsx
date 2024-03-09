import { Header } from '../components/header.js'
import { Layout } from '../layouts/layout.js'

export default function Home() {
  return (
    <Layout title="Accueil">
      <div className="container">
        <Header />
        <div className="text-blue-500">AdonisJS x Inertia x ReactH</div>
        <span>
          Learn more about AdonisJS and Inertia.js by visiting the{' '}
          <a href="https://docs.adonisjs.com/guides/inertia">AdonisJS documentation</a>.
        </span>
      </div>
    </Layout>
  )
}
