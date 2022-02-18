import React, { useState,useContext, useEffect} from "react";
import { SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity, View ,Button} from "react-native";
import {AuthContext} from './AuthProvider'

import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Login = ({ navigation }) => {
    const [text, onChangeText] = useState();
    const [number, onChangeNumber] = useState();
    const {register,login,googleLogin,fbLogin} = useContext(AuthContext);

    useEffect(() => {
        // initialize the Google SDK
        GoogleSignin.configure({
          webClientId: '622484759870-ds9h7m0qhdnvcqboj2kure82nq1nciml.apps.googleusercontent.com',
        });
      }, []);

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
            <Text style={{alignSelf:'flex-start',marginLeft:18}}>email</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={(mail)=>onChangeText(mail)}
                    value={text}
                />
                <Text style={{alignSelf:'flex-start',marginLeft:18}}>password</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={(pwd)=>onChangeNumber(pwd)}
                    value={number}
                    placeholder="useless placeholder"
                    secureTextEntry={true}

                />
                <TouchableOpacity onPress={() => login(text,number)}>
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => register(text, number)}>
                    <Text>Signup</Text>
                </TouchableOpacity>
                
            </View>
            <View style={styles.btnstyle}>
                <Button  onPress={() =>googleLogin()} title="google"></Button>
                <Button  onPress={() =>fbLogin()} title="facebook"></Button>
                </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: "90%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    btnstyle: {
        marginVertical:10,
        flexDirection: "row",
        justifyContent: "space-around"

    }
});

export default Login;