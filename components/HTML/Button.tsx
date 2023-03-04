import {
  ButtonHTMLAttributes,
  createElement,
  MouseEventHandler,
  useCallback,
} from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: string
}
const buttonDefaultClass = 'btn-default'

export default function Button({
  children,
  onClick,
  as,
  ...props
}: ButtonProps) {
  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => onClick && onClick(e),
    [onClick],
  )

  if (as) {
    return createElement(
      as,
      {
        ...props,
        onClick: handleClick,
        className: `${buttonDefaultClass} ${props.className}`,
      },
      children,
    )
  }
  return (
    <button
      {...props}
      className={`${buttonDefaultClass} ${props.className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
