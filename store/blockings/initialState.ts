const initialState = {
  blockings: [],
}

export type Blocking = {
  blocker: string
  blockee: string
  _id: string
}
export type Blockings = typeof initialState

export const blockingsEvents = ['getOne', 'block', 'unblock']

export default initialState
