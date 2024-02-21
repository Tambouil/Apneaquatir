import { Children } from '@kitajs/html'

interface LabelProps {
  name: string
  children: Children
}

export const Label = (props: LabelProps) => {
  const { name, children } = props
  return <label for={name}>{children}</label>
}
