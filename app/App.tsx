import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'
import store from './redux/redux'
import Nav from './router/nav'


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Nav/>
      </NavigationContainer>
    </Provider>
  )
}




