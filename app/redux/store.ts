import redux from 'redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import type { Reducer, AnyAction } from '@reduxjs/toolkit'


const userInit = {
    id: '',
    info: {
      first_name: '',
      last_name: '',
      user_name: '',
      email: '',
      phone: '',
      id_agency: '',
      post_code: '',
      city: '',
      street_name: '',
      street_number: ''  
    }
}
const tokenInit = {
  token: ''
}
const apptsInit = [{
    id: '',
    idMission: '',
    date: '',
    startHour: '',  
    endHour: '',
    streetName: '',
    streetNumber: '',
    postCode: "",
    city: "",
    mission: {
        idClient: '',
        idRecurence: ''
    }
}]

export type UserInit = typeof userInit
export type TokenInit = typeof tokenInit
export type ApptsInit = typeof apptsInit

export type TokenAction = {
    type: string
    payload: string
}
export type UserAction = {
    type: string
    payload: typeof userInit.info
}
export type ApptsAction = {
  type: string
  payload: typeof apptsInit
}
export type idAction = {
  type: string
  payload: string
}


export const tokenSlice = createSlice({
  name: 'token',
  initialState: tokenInit,
  reducers: {
    newToken: (state: TokenInit, action: TokenAction) => {
        state.token = action.payload
    },
  },
})
export const userSlice = createSlice({
  name: 'user',
  initialState: userInit,
  reducers: {
      newUser: (state: UserInit, action: UserAction) => {
          state.info = action.payload
      },
      newId: (state: UserInit, action: idAction) => {
        state.id = action.payload
    },
  },
})

export const apptSlice = createSlice({
  name: 'appointments',
  initialState: apptsInit,
  reducers: {
      newAppts: (state: ApptsInit, action: ApptsAction) => {
          state = action.payload
      },
  },
})


/*
function tokenReducer(state = tokenInit, action: Action) {
    if (action.type === 'token/new') {
      return {
        ...state,
        token: action.payload
      }
    }
    return tokenInit
  }
*/

const store = configureStore({
    reducer: {
      token: tokenSlice.reducer,
      user: userSlice.reducer
  } 
})

export const {newToken} = tokenSlice.actions
export const {newUser, newId} = userSlice.actions
export const {newAppts} = apptSlice.actions

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store