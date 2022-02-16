import React from 'react'
import { SafeAreaView, StyleSheet, TextInput,Button,TouchableOpacity } from "react-native";
import { View, Text } from 'react-native'


const Homescreen = ({ navigation}) => {
    console.log("homescreen",navigation);

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={styles.mainview}>
                <Text> Home Screen</Text>
                <TouchableOpacity onPress={() =>{navigation.navigate("Login")}}>
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default Homescreen

const styles = StyleSheet.create({
    mainview:{
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})