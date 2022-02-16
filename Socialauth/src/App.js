/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import RootNavigation from './Homescreen'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import Login from './Login'



import Homescreen from './Homescreen';
const RootStack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        
          <RootStack.Screen name="Login" component={Login} options={{ headerShown: false }} /> 
          <RootStack.Screen name="Homescreen" component={Homescreen} />
        

      </RootStack.Navigator>
    </NavigationContainer>
  );
};



export default App;
