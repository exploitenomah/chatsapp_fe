import Image from 'next/image'
import { ImgHTMLAttributes } from 'react'

export default function Avatar({
  width,
  height,
  loading,
}: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <Image
      className='object-contain rounded-full'
      src='https://pps.whatsapp.net/v/t61.24694-24/319864754_753310922957117_7159812533690157405_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdTfrWkgK_b4cN1noeg1D-8xm312_jaqBAxlcIILTh9hfg&oe=6410DA08'
      alt={''}
      width={Number(width) || 40}
      height={Number(height) || 40}
      loading={loading || 'eager'}
      priority
    />
  )
}
