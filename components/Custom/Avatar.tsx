import UserIcon from '@assets/UserIcon'
import Image, { ImageProps } from 'next/image'
import { useMemo } from 'react'

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
  const imgSrc = useMemo(() => {
    if (typeof src === 'string' && src.includes('upload')) {
      const srcSplit = src.split('/upload/')
      const firstPart = srcSplit[0]
      const secondPart = srcSplit[1]
      return `${firstPart}/upload/e_sharpen/w_${width},h_${height},c_scale/${secondPart}`
    } else return src
  }, [height, src, width])

  if (!Boolean(src))
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
        handleLoad && handleLoad()
      }}
      onError={() => {
        handleError && handleError()
      }}
      className='text-center rounded-full '
      {...{ src: imgSrc, width, height, loading, alt }}
    />
  )
}
