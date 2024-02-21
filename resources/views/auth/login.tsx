import { Layout } from '#views/layouts/app'
import { csrfField, route } from '#start/view'
import { Button } from '#views/components/button'
import { InputGroup } from '#views/components/form/input_group'

const login = () => {
  return (
    <Layout>
      <h1>login</h1>

      <form action={route('auth.login')} method="post">
        {csrfField()}
        <InputGroup label="email" name="email" type="email" />
        <InputGroup label="password" name="password" type="password" />

        <Button type="submit">Login</Button>
      </form>
    </Layout>
  )
}

export default login
