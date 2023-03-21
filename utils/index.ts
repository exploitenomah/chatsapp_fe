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
