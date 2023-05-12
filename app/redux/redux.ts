import redux from 'redux'
import { configureStore } from '@reduxjs/toolkit'

type Action = {
    type: string
    payload: string
}

const tokenInit = {
    token: 'daz*$v.qz-dD13C4**h'
}

function tokenReducer(state = tokenInit, action: Action) {
    console.log('meh')
    if (action.type === 'token/new') {
      return {
        ...state,
        token: action.payload
      }
    }
    return state
  }

const store = configureStore({ reducer: tokenReducer })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store