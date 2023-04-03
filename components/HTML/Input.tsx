import { forwardRef, InputHTMLAttributes, ForwardedRef } from 'react'

export function Input(
  {
    className,
    onChange,
    value,
    ...others
  }: InputHTMLAttributes<HTMLInputElement> & {},
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <input
      ref={ref}
      className={`input-default ${className}`}
      onChange={onChange}
      value={value}
      {...others}
    />
  )
}

export default forwardRef(Input)
