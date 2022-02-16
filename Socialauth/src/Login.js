import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity, View } from "react-native";

const Login = ({ navigation }) => {
    const [text, onChangeText] = useState('');
    const [number, onChangeNumber] = useState(null);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeNumber}
                    value={number}
                    placeholder="useless placeholder"

                />
                <TouchableOpacity onPress={() => { navigation.navigate("Homescreen") }}>
                    <Text>Login</Text>
                </TouchableOpacity>
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
    }
});

export default Login;