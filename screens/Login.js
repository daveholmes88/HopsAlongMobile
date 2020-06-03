import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';
import * as SecureStore from "expo-secure-store";

export default function Login({ navigation, route }) {
    const [username, onChangeUsername] = useState("");
    const [password, onChangePassword] = useState("");

    useEffect(() => {
        const token = SecureStore.getItemAsync("token")
        if (token) {
            navigation.navigate('HomeScreen')
        }
    })

    const sendLogin = () => {
        console.log('+++++++++++++++++++++++')
        const reqUser = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        };
        fetch("http://localhost:3000/users", reqUser)
            .then((resp) => resp.json())
            .then((data) => {
                SecureStore.setItemAsync("token", data.token)
                navigation.navigate('HomeScreen', { user: data.user })
            })
            .catch((err) => console.log(err));
    };

    const homeScreenNav = () => {
        navigation.navigate('HomeScreen')
    }

    return (
        <View style={styles.container}>
            {route.params.user ? homeScreenNav() : null}
            <Text>Username:</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => onChangeUsername(text)}
                value={username}
                placeholder='username'
            />
            <Text>Password:</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => onChangePassword(text)}
                value={password}
                secureTextEntry={true}
                placeholder='password'
            />
            <Button
                title='Submit'
                onPress={sendLogin} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: 'center'
    },
    textInput: {
        height: 100,
        borderColor: "yellow",
        width: 300,
        borderWidth: 1
    }
})