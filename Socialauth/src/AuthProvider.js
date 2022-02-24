import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { Settings } from 'react-native-fbsdk-next';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  Settings.setAppID('693673814986915');
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
            setUser(null)
          } catch (e) {
            console.log(e);
          }
        },
        googleLogin: async () => {
          // Get the users ID token
          const { idToken } = await GoogleSignin.signIn();

          // Create a Google credential with the token
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);

          // Sign-in the user with the credential
          return auth().signInWithCredential(googleCredential);
        },
        googleSignOut: async () => {
          try {
            await GoogleSignin.signOut();
            setUser(null)// Remember to remove the user from your app's state as well
          } catch (error) {
            console.error(error);
          }
        },
        fbLogin: async () => {
          try {
            // Attempt login with permissions
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

            if (result.isCancelled) {
              throw 'User cancelled the login process';
            }

            // Once signed in, get the users AccesToken
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
              throw 'Something went wrong obtaining access token';
            }

            // Create a Firebase credential with the AccessToken
            const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

            // Sign-in the user with the credential
            return auth().signInWithCredential(facebookCredential);
          }
          catch (error) {
            console.log(error);
          }
        },
        fbLogout:async () => { 
              try{
                  LoginManager.logOut();
                  setUser(null)
              }
              catch (error) {
                console.log(error);
              }
        }
      }}>
      {children}
    </AuthContext.Provider>
  );
};