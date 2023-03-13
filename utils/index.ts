export const makeUniqueArrOfObjectsWithIdKey = (arr: { [x: string]: any }[]) =>
  Object.values(
    arr.reduce(
      (acc, obj: { [x: string]: any }) => ({
        ...acc,
        [obj.id]: obj,
      }),
      {},
    ),
  )
