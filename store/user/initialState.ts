const initialState = {
  firstName: '',
  lastName: '',
  nickName: '',
  email: '',
  _id: '',
  friendsCount: 0,
  about: '',
  profileImage: {
    filename: '',
    path: '',
    size: 0,
    fieldname: '',
    originalname: '',
    encoding: '',
    mimetype: '',
  },
}

export type User = typeof initialState

export const userEvents = ['getMe', 'updateMe', 'getOne', 'getMany']

export default initialState
