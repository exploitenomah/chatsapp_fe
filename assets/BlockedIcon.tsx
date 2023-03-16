import { HTMLAttributes } from 'react'

export default function BlockedIcon({ className }: HTMLAttributes<SVGElement>) {
  return (
    <>
      <svg
        viewBox='0 0 24 24'
        height='24'
        width='24'
        preserveAspectRatio='xMidYMid meet'
        className={className}
        version='1.1'
        x='0px'
        y='0px'
        enableBackground='new 0 0 24 24'
        xmlSpace='preserve'
      >
        <path
          fill='currentColor'
          d='M12,2.8c-5.3,0-9.7,4.3-9.7,9.7s4.3,9.7,9.7,9.7s9.7-4.3,9.7-9.7S17.3,2.8,12,2.8z  M4.7,12.5c0-4,3.3-7.3,7.3-7.3c1.6,0,3.1,0.5,4.3,1.4L6.1,16.8C5.2,15.6,4.7,14.1,4.7,12.5z M12,19.8c-1.6,0-3-0.5-4.2-1.4 L17.9,8.3c0.9,1.2,1.4,2.6,1.4,4.2C19.3,16.5,16,19.8,12,19.8z'
        ></path>
      </svg>
    </>
  )
}
