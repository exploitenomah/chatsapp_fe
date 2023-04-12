import UserIcon from '@assets/UserIcon'
import Image, { ImageProps } from 'next/image'

export default function Avatar({
  width,
  height,
  loading,
  src,
  alt,
}: ImageProps & {
  src?: ImageProps['src']
}) {
  if (!src)
    return (
      <div
        className={`flex justify-center items-center`}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <UserIcon className='' />
      </div>
    )
  return <Image {...{ src, width, height, loading, alt }} />
}
