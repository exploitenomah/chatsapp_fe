import UserIcon from '@assets/UserIcon'
import Image, { ImageProps } from 'next/image'
import { useState } from 'react'
export default function Avatar({
  width,
  height,
  loading,
  src,
  alt,
  handleError,
  handleLoad,
}: ImageProps & {
  src?: ImageProps['src']
  handleError?: () => void
  handleLoad?: () => void
}) {
  const [srcLoaded, setSrcLoaded] = useState(true)
  if (!src || !srcLoaded)
    return (
      <div
        className={`flex justify-center items-center rounded-full`}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <UserIcon className='' />
      </div>
    )
  return (
    <Image
      onLoad={() => {
        setSrcLoaded(true)
        handleLoad && handleLoad()
      }}
      onError={() => {
        setSrcLoaded(false)
        handleError && handleError()
      }}
      className='text-center rounded-full '
      {...{ src, width, height, loading, alt }}
    />
  )
}
