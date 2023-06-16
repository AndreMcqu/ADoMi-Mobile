import { NavigationContainer } from '@react-navigation/native';
import {useState, useEffect} from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import store, { RootState } from './redux/store'
import BottomTabNav from './router/BottomTabNav'
import Login from './screens/login'
import moment from 'moment'

moment.locale('fr')

function CheckLogin(){
  const token = useSelector((state: RootState) => state.token.token)
  const user = useSelector((state: RootState) => state.user.info)
  const userId = useSelector((state: RootState) => state.user.id)

  token && console.warn('token : ' + token)
  userId && console.warn("user id : " + userId)

  return (
      token && token.length > 0
      ? 
        (
            <NavigationContainer>
              <BottomTabNav/>
            </NavigationContainer>
        )
      :
        (
          <Login/>
        )
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <CheckLogin/>
    </Provider>  
  )
} 




