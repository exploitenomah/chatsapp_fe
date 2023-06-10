const initialState: Blockings = {
  blockings: [],
}

export type Blocking = {
  blocker: string
  blockee: string
  _id: string
}
export type Blockings = {
  blockings: Blocking[]
}

export const blockingsEvents = ['getOne', 'block', 'unblock']

export default initialState
