import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
  
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
          googleSignOut:async () => {
            try {
              await GoogleSignin.signOut();
              setUser(null)// Remember to remove the user from your app's state as well
            } catch (error) {
              console.error(error);
            }
          }
        }}>
        {children}
      </AuthContext.Provider>
    );
  };