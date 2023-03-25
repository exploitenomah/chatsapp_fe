import { useCallback } from 'react'

export default function useElementIsInView() {
  const handleElementInView = useCallback(
    (currentElement: HTMLElement | null, onElementInView: () => void) => {
      const elementCurrentParent = currentElement?.parentElement
      let elementIsInView =
        currentElement?.offsetTop! - elementCurrentParent?.scrollTop! <=
        elementCurrentParent?.clientHeight!
      if (elementIsInView) {
        onElementInView()
      }
    },
    [],
  )
  return handleElementInView
}
