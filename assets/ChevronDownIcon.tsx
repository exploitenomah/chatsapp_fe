import { HTMLAttributes } from 'react'

export default function ChevronIcon({
  className,
}: HTMLAttributes<SVGElement>) {
  return (
    <>
      <svg
        viewBox='0 0 19 20'
        height='20'
        width='20'
        preserveAspectRatio='xMidYMid meet'
        className={className}
        version='1.1'
        x='0px'
        y='0px'
        xmlSpace='preserve'
      >
        <path
          fill='currentColor'
          d='M3.8,6.7l5.7,5.7l5.7-5.7l1.6,1.6l-7.3,7.2L2.2,8.3L3.8,6.7z'
        ></path>
      </svg>
    </>
  )
}
