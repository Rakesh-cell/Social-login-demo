import React,{useState,useEffect} from 'react';
import {StyleSheet,Text,View,} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage';



const Stack =createStackNavigator();

import OnboardScreen from '../OnboardScreen'
import Login from '../Login'
import Signup from '../Signup'



const AuthStack = () => {
 const [firstlaunch,setfirstlaunch]=useState(null)
   let routeName;

 useEffect(() =>{
      AsyncStorage.getItem('alreadyLaunched').then(value =>{
        if(value==null){
          AsyncStorage.setItem('alreadyLaunched','true');
          setfirstlaunch(true);
        }
        else{ 
          setfirstlaunch(false);
        }
      })
 },[])
 if (firstlaunch === null) {
   return null; 
 } else if (firstlaunch == true) {
   routeName = 'Onboarding';
 } else {
   routeName = 'Login';
 }


   return(
    
    <Stack.Navigator  initialRouteName={routeName}>
        <Stack.Screen name='Onboarding' component={OnboardScreen} options={{header:()=>null}}/>
        <Stack.Screen name='Login' component={Login} options={{header:()=>null}}/>
        <Stack.Screen name="Signup" component={Signup} options={{header:()=>null}}/>


    </Stack.Navigator>
   )

};

export default AuthStack;

const styles = StyleSheet.create({
  txt:{
  
    alignSelf:'center',
    justifyContent:'center',
    alignContent:'center',
    alignItems: 'center',
  },

});