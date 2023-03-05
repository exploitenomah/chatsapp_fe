import { InputHTMLAttributes } from 'react'

export default function Input({
  className,
  onChange,
  value,
  ...others
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`input-default ${className}`}
      onChange={onChange}
      value={value}
      {...others}
    />
  )
}
