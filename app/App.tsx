import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Nav from './router/nav'

export default function App() {
  return (
      <NavigationContainer>
        <Nav/>
      </NavigationContainer>
  )
}

