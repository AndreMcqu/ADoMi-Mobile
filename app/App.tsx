import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'
import store from './redux/store'
import BottomTabNav from './router/BottomTabNav'


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomTabNav/>
      </NavigationContainer>
    </Provider>  
  )
} 




