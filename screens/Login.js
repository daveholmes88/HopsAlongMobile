import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';
import * as SecureStore from "expo-secure-store";

export default function Login({ navigation }) {

    const [username, onChangeUsername] = useState("");
    const [password, onChangePassword] = useState("");
    console.log(username, password);

    useEffect(() => {
        if (SecureStore.getItemAsync("token")) {
            navigation.navigate('HomeScreen')
        }
    }, [])

    const sendLogin = () => {
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
                    .then(SecureStore.getItemAsync("token"))
                    .then((results) => {
                        navigation.navigate('HomeScreen')
                        console.log(data)
                    })
            })
            .catch((err) => console.log(err));
    };

    console.log()
    return (
        <View style={styles.container}>
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