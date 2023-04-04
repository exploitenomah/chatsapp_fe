import { useMemo } from 'react'
export const doesNotContainOnlyNumsRegex = /(?!^\d+$)^.+$/
export const isValidNickNameRegex = /^[\w](?!.*?\.{2})[\w.]{1,28}[\w]$/

export default function useIsNickNameInvalid(nickName: string) {
  const isNickNameInvalid = useMemo(() => {
    return (
      nickName.length > 0 &&
      !(
        isValidNickNameRegex.test(nickName.trim()) &&
        doesNotContainOnlyNumsRegex.test(nickName.trim())
      )
    )
  }, [nickName])
  return isNickNameInvalid
}
