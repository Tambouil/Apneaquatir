import { Children } from '@kitajs/html'

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  children: Children
}

export const Button = (props: ButtonProps) => {
  const { type = 'button', children } = props
  return <button type={type}>{children}</button>
}
