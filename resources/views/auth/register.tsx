import { csrfField, route } from '#start/view'
import { Button } from '#views/components/button'
import { InputGroup } from '#views/components/form/input_group'
import { Layout } from '#views/layouts/app'

const register = () => {
  return (
    <Layout>
      <h1>Register</h1>

      <form action={route('auth.register')} method="post">
        {csrfField()}
        <InputGroup label="email" name="email" type="email" />
        <InputGroup label="password" name="password" type="password" />

        <Button type="submit">Register</Button>
      </form>
    </Layout>
  )
}

export default register
