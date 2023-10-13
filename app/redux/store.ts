import redux from 'redux'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import type { Reducer, AnyAction } from '@reduxjs/toolkit'


const userInit = {
	id: '',
	info: {
		id: '',
		first_name: '',
		last_name: '',
		user_name: '',
		email: '',
		phone: '',
		id_agency: '',
		post_code: '',
		city: '',
		street_name: '',
		street_number: '',
		role: {
			label: ''
		},
		agency: {
			name: '',
			adress: ''
		}
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
		deleteToken: (state: TokenInit) => {
			console.log('delete token in store')
			state.token = ''
		}
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
		deleteUser: (state: UserInit) => {
			state = userInit
			console.log('delete user in store')
		}
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

export const { newToken, deleteToken } = tokenSlice.actions
export const { newUser, newId, deleteUser } = userSlice.actions
export const { newAppts } = apptSlice.actions

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store