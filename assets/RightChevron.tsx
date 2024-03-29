import { HTMLAttributes } from 'react'

export default function RightChevron({
  className,
}: HTMLAttributes<SVGElement>) {
  return (
    <>
      <svg
        stroke='currentColor'
        fill='currentColor'
        strokeWidth='0'
        viewBox='0 0 16 16'
        height='1em'
        width='1em'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'
        ></path>
      </svg>
    </>
  )
}
