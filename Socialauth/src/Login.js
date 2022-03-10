import React, { useState,useContext, useEffect} from "react";
import { SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity, View ,Button} from "react-native";
import {AuthContext} from './AuthProvider'
import Inputfield from './components/Inputfield'

import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [msgerr, setmsgErr] = useState()

    const [password, setPassword] = useState('')
    const [passerr,setpasserr] = useState()
    const {register,login,googleLogin,fbLogin} = useContext(AuthContext);

    useEffect(() => {
        // initialize the Google SDK
        GoogleSignin.configure({
          webClientId: '622484759870-ds9h7m0qhdnvcqboj2kure82nq1nciml.apps.googleusercontent.com',
        });
      }, []);
      const handlelogin=() => {
       
        let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!pattern.test(String(email).toLowerCase())) {
            Alert.alert("Email","Invalid email")
        }
        else if (password.length < 8) {
            Alert.alert("Password","Password must be atleast 8 chars")
        }
        else{
            login(email,password)
        setEmail('')
        setPassword('')
        //error 
        }

    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
            <View style={styles.inputContainer}>  
            <Inputfield 
                name="email" 
                Lefticon="mail" 
                msgerr={msgerr} 
                value={email} 
                Label="Email"
                onChangeText={(email) => {
                    const check = email
                    
                    let regix = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    setEmail(email)
                    if (!check) {
                        setmsgErr("enter your email Id")    
                        
                    }
                    else if (!regix.test(String(check).toLowerCase())) {
                        setmsgErr("email is not valid")
                        
                    }
                    else {
                        // mailvalid = true
                        setmsgErr(null)
                        
                    }
                    

                }}

            
            />

        </View>
        <View style={styles.inputContainer}>  
        <Inputfield 
                 Label="Password"
                 name='passward'
                 Lefticon='lock-closed'
                 ricon="eye-off"
                 value={password}
                 secureTextEntry
                 msgerr={passerr}
                 onChangeText={(password) => {
                     const temp = password
                     setPassword(password)
                     if (!temp) {
                         setpasserr("password is a Mandatory")
                     }
                     else if (String(temp).length < 8) {
                         setpasserr("passward should have atleast 8 characters length")
                     }
                     else {
                         
                         setpasserr(null)
                     }
                 }}
                 />
        </View>
        
        <TouchableOpacity style={styles.btn} onPress={()=> {handlelogin()}}>
            <Text style={styles.btntext} >Login</Text>   
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                <Text style={ {color: 'black' }}>Don't have a Account? </Text>
                <Text style={styles.ptext} onPress={() => navigation.navigate('Signup')}> Sign Up </Text>
        </View>




       

                <TouchableOpacity onPress={() => register(email, password)}>
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

    },
    // 
    inputContainer:{
        flexDirection:'row',
        marginBottom:5,
        alignItems:'center',
        marginHorizontal:15,
       
    },
  
    //btn StyleS
    btn:{
        width: '90%',
        height: 50,
        borderColor:'blue',
        backgroundColor: '#0148a4',
       // bordrRadius:10,//error
        marginVertical:20,
        borderWidth:0,
    },
    btntext:{
        fontSize:23,
        fontWeight:'bold',
        color:'white',
        alignSelf: 'center',
        marginVertical:10,
    },
    fpassword: {
        alignSelf: 'flex-end',
        color:'#000000'
    },
  

});

export default Login;