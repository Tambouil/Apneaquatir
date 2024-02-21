export interface InputProps {
  name: string
  type?: string
  placeholder?: string
}

export const Input = (props: InputProps) => {
  const { name, type = 'text', placeholder } = props
  return (
    <input
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />
  )
}
