import React, { useContext, useState, useEffect } from 'react'
import { ScrollView, SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Button } from 'react-native'
import Inputfield from './components/Inputfield'
import { AuthContext } from './AuthProvider'

const Signup = ({ navigation}) => {
    const [email, setEmail] = useState('')
    const [msgerr, setmsgErr] = useState()

    const [fname, setfname] = useState('')
    const [ferr, setferr] = useState()

    const [lname, setlname] = useState('')
    const [lerr, setlerr] = useState()

    const [password, setPassword] = useState('')
    const [passerr, setpasserr] = useState()
    const { register, login, googleLogin, fbLogin } = useContext(AuthContext);


    const handlesignup = () => {


        let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (fname.length < 1) {
            Alert.alert("First Name", "First Name is required")
        } else if (lname.length < 1) {
            Alert.alert("Last Name", "Last name is required")
        }
        else if (!pattern.test(String(email).toLowerCase())) {
            Alert.alert("Email", "Invalid email")
        }
        else if (password.length < 8) {
            Alert.alert("Password", "Password must be atleast 8 chars")
        }
        else {
            register(email, password)
        }

        // dispatch(signInUser(formData))
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Inputfield
                        name="First Name"
                        Lefticon="person"
                        msgerr={ferr}
                        value={fname}
                        Label="First Name"
                        onChangeText={(fname) => {
                            const temp = fname
                            setfname(fname)
                            if (!temp) {
                                setferr("Name is Required")
                            }
                            else if (String(temp).length < 3) {
                                setferr("Name should contain atleast 3 char")
                            }
                            else {
                                setferr(null)
                            }
                        }}
                    />

                </View>
                <View style={styles.inputContainer}>
                    <Inputfield
                        name="Last Name"
                        Lefticon="person"
                        msgerr={lerr}
                        value={lname}
                        Label="Last Name"
                        onChangeText={(lname) => {
                            const temp = lname
                            setlname(lname)
                            if (!temp) {
                                setlerr(" Last Name is Required")
                            }
                            else if (String(temp).length < 1) {
                                setlerr("Name should contain atleast 1 char")
                            }
                            else {
                                setlerr(null)
                            }
                        }}
                    />

                </View>
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

                <TouchableOpacity style={styles.btn} onPress={() => { handlesignup() }}>
                    <Text style={styles.btntext} >Create Account</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <Text style={{ color: 'black' }}>Already have an account? </Text>
                    <Text style={{ color: 'blue' }} onPress={() => navigation.navigate('Login')}> Login </Text>
                </View>

            </View>
            <View style={styles.btnstyle}>
                <Button onPress={() => googleLogin()} title="google"></Button>
                <Button onPress={() => fbLogin()} title="facebook"></Button>
            </View>
        </SafeAreaView>
    )
}

export default Signup;
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
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "space-around"

    },
    // 
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 5,
        alignItems: 'center',
        marginHorizontal: 15,

    },

    //btn StyleS
    btn: {
        width: '90%',
        height: 50,
        borderColor: 'blue',
        backgroundColor: '#0148a4',
        // bordrRadius:10,//error
        marginVertical: 20,
        borderWidth: 0,
    },
    btntext: {
        fontSize: 23,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center',
        marginVertical: 10,
    },
    fpassword: {
        alignSelf: 'flex-end',
        color: '#000000'
    },
    ptext: {

        color: 'blue'
    },
    pstyle: {
        alignSelf: 'flex-end',
        marginVertical: 10,
        marginRight: 20,
    }


});
