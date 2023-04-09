import Image from 'next/image'
import { ImgHTMLAttributes } from 'react'

export default function Avatar({
  width,
  height,
  loading,
}: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <Image
      className='object-contain h-full rounded-full'
      src='/images/profilepic.webp'
      alt={''}
      width={Number(width) || 40}
      height={Number(height) || 40}
      loading={loading || 'eager'}
      priority
    />
  )
}
