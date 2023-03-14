const initialState = {
  firstName: '',
  lastName: '',
  nickName: '',
  email: '',
  _id: '',
  friendsCount: 0,
}

export type User = typeof initialState

export const userEvents = ['getMe', 'updateMe', 'getOne', 'getMany']

export default initialState
