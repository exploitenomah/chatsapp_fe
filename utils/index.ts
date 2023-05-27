export const makeUniqueArrOfObjectsWith_IdKey = (
  arr: { [x: string]: any }[],
) => {
  return Object.values(
    arr.reduce(
      (acc, obj: { [x: string]: any }) => ({
        ...acc,
        [obj._id]: obj,
      }),
      {},
    ),
  )
}

export const bothArraysContainTheSameStringValues = (
  arr1: string[],
  arr2: string[],
) => {
  const setFromBothArrays = new Set([...arr1, ...arr2])
  return arr1.length === arr2.length && setFromBothArrays.size === arr2.length
}

export const isSubString = (str: string, match: string) => {
  return (
    str.toLocaleLowerCase().startsWith(match.toLocaleLowerCase().trim()) ||
    str.toLocaleLowerCase().includes(match.toLocaleLowerCase().trim())
  )
}
