import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { AuthContext } from './AuthProvider';
import { createStackNavigator } from '@react-navigation/stack'

import ChatScreen from './ChatScreen'
import Login from './Login'
import Homescreen from './Homescreen';
import AuthStack from './Navigation/AuthStack'
import ChatUsers from './ChatUsers';

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

    console.log("user", user);

    return (
        <NavigationContainer>
            <RootStack.Navigator>
                {!user ?
                    <>
                        <RootStack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />
                        {/* <AuthStack/> */}
                    </>
                    : <>
                        <RootStack.Screen name="Homescreen" component={Homescreen} />
                        <RootStack.Screen name='ChatUser' component={ChatUsers} />
                        <RootStack.Screen name='Chat' component={ChatScreen} options={({ route }) => ({
                            title: route.params.userName,
                            headerBackTitleVisible: false,
                        })} />

                    </>
                }
            </RootStack.Navigator>
        </NavigationContainer>
    );
};
export default Routes;