import UserIcon from '@assets/UserIcon'
import Image, { ImageProps } from 'next/image'
import { useState, useMemo } from 'react'

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
      return `${srcSplit[0]}/upload/e_sharpen/w_${width},h_${height},c_scale/${srcSplit[1]}`
    } else return src
  }, [height, src, width])

  const [loadErr, setLoadErr] = useState<Boolean>(false)

  if (!Boolean(src) || loadErr)
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
        loadErr === true && setLoadErr(false)
      }}
      onError={() => {
        handleError && handleError()
        loadErr === false && setLoadErr(true)
      }}
      className='text-center rounded-full '
      {...{ src: imgSrc, width, height, loading, alt }}
    />
  )
}
