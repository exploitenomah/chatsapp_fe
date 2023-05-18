import UserIcon from '@assets/UserIcon'
import Image, { ImageProps } from 'next/image'

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
      {...{ src, width, height, loading, alt }}
    />
  )
}
