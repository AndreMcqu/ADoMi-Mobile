import redux from 'redux'
import { configureStore } from '@reduxjs/toolkit'

type Action = {
    type: string
    payload: string
}

const tokenInit = {
    token: 'Token initial à la con'
}

function tokenReducer(state = tokenInit, action: Action) {
    if (action.type === 'token/new') {
      return {
        ...state,
        token: action.payload
      }
    }
    return tokenInit
  }

const store = configureStore({ reducer: tokenReducer })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store