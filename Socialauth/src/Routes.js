import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { AuthContext } from './AuthProvider';
import { createStackNavigator } from '@react-navigation/stack'
import Login from './Login'

import Homescreen from './Homescreen';

const RootStack = createStackNavigator();

const Routes = () => {
    const { user, setUser } = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false);
    };

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    console.log("user" ,user);

    return (
        <NavigationContainer>
            <RootStack.Navigator>
                {!user?
                    <>
                    <RootStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    </>
                    :<> 
                    <RootStack.Screen name="Homescreen" component={Homescreen} />

                    </>
                }
            </RootStack.Navigator>
        </NavigationContainer>
    );
};
export default Routes;