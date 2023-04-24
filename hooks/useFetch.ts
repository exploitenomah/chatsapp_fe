import { useCallback } from 'react'

export default function useFetch() {
  return useCallback(async (url: string, options?: RequestInit) => {
    let response
    try {
      const res = await fetch(url, options)
      response = res
    } catch (err) {
      response = { status: 500, message: (err as Error)?.message }
    } finally {
      return response as Response & { message?: string }
    }
  }, [])
}
