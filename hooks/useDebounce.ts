import { useEffect, useMemo } from 'react'

import { debounce } from '@utils/debounce'

export default function useDebounce(
  fn: (...params: any[]) => void,
  ms: number,
): (...params: any[]) => void {
  const debouncedFunc = useMemo(
    () => debounce<(...params: any[]) => void>(fn, ms),
    [fn, ms],
  )
  return debouncedFunc
}
