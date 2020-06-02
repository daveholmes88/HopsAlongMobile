import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';
import * as SecureStore from "expo-secure-store";

export default function Login({ navigation }) {

    const [username, onChangeUsername] = useState("");
    const [password, onChangePassword] = useState("");
    console.log(username, password);

    useEffect(() => {
        SecureStore.getItemAsync("token")
            .then(data => {
                const token = data
                if (token) {
                    const reqObj = {
                        method: 'GET',
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }
                    fetch('http://localhost:3000/users', reqObj)
                        .then(resp => resp.json())
                        .then(data => {
                            navigation.navigate('HomeScreen', { user: data.user })
                        })
                        .catch(err => console.log(err))
                }
            })
    }, [])

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