const variablesToDeleteFromLocalStorage = [
  'firstName',
  'lastName',
  'email',
  'password',
  'nickName',
  'confirmPassword',
  'nickNameOrEmail',
]
export const removeLocalStorageFormValues = () => {
  variablesToDeleteFromLocalStorage.forEach((el) => localStorage.removeItem(el))
}
