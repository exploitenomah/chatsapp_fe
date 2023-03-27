import { ReactNode } from 'react'

export default function SecondaryPanel({
  children,
  show,
}: {
  children: ReactNode | ReactNode[]
  show: boolean
}) {
  return (
    <>
      <div
        className={`relative h-full bg-primary-darkest transition-all duration-300 overflow-hidden ${
          show ? ' w-2/5 ' : ' w-0 '
        }`}
      >
        {children}
      </div>
    </>
  )
}
