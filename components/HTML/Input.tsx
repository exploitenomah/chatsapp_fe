import { InputHTMLAttributes } from 'react'

export default function Input({
  className,
  onChange,
  value,
  ...others
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`inline-block w-full bg-secondary-darkest text-contrast-secondary 
      focus:outline-none placeholder:text-contrast-secondary placeholder:capitalize px-4 pt-3 pb-4 rounded-lg ${className}`}
      onChange={onChange}
      value={value}
      {...others}
    />
  )
}
