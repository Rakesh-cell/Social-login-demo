import React,{useContext} from 'react'
import { SafeAreaView, StyleSheet, TextInput,Button,TouchableOpacity } from "react-native";
import { View, Text } from 'react-native'
import { AuthContext } from './AuthProvider';

const Homescreen = ({ navigation}) => {
    console.log("homescreen",navigation);
    const {user, logout,googleSignOut,fbLogout} = useContext(AuthContext);
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={styles.mainview}>
                <Text> Home Screen</Text>
                <Text> {user?.uid}</Text>

                <TouchableOpacity onPress={() =>logout()}>
                    <Text> click to Login out</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>googleSignOut()}>
                    <Text> googleSignOut</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>fbLogout()}>
                    <Text> FB_ Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default Homescreen

const styles = StyleSheet.create({
    mainview:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical:10,
    },
})