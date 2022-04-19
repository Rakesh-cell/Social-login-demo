/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React,{useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import RootNavigation from './Homescreen'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import {notifications } from './Notification/Notifications'

import Providers from './Providers';
 

const App = () => {
  useEffect(() => {
    notifications.configure()
},[])

  return <Providers/>
   
};



export default App;
