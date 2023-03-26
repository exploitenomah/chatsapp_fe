import { useCallback } from 'react'

export default function useElementIsInView() {
  const handleElementInView = useCallback(
    (
      currentElement: HTMLElement | null,
      onElementInView: (elementIsInView: boolean) => void,
    ) => {
      const elementCurrentParent = currentElement?.parentElement
      let elementIsInView =
        currentElement?.offsetTop! - elementCurrentParent?.scrollTop! <=
        elementCurrentParent?.clientHeight!
      onElementInView(elementIsInView)
    },
    [],
  )
  return handleElementInView
}
