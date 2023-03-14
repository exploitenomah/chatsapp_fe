import { ActionCreatorWithPayload, CaseReducerActions } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Socket } from 'socket.io-client'

export default function useHandlers(
  socket: Socket,
  events: string[],
  actions: CaseReducerActions<
    {
      [x: string]: ActionCreatorWithPayload<unknown, string>
    },
    string
  >,
) {
  const dispatch = useDispatch()

  useEffect(() => {
    events.map((event) => {
      return socket.on(event, (data) => {
        dispatch(actions[event](data))
      })
    })

    return () => {
      events.map((event) => {
        return socket.off(event, (data) => {
          dispatch(actions[event](data))
        })
      })
    }
  }, [actions, dispatch, events, socket])
}
