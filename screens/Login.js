import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';
import * as SecureStore from "expo-secure-store";

export default function Login({ navigation, route }) {
    const [username, onChangeUsername] = useState("");
    const [password, onChangePassword] = useState("");
    const [email, onChangeEmail] = useState("")
    const [signup, setSignup] = useState(false)

    useEffect(() => {
        SecureStore.getItemAsync("token")
            .then(data => {
                const token = data
                if (token) {
                    navigation.navigate('HomeScreen')
                }
            })
    }, [])

    const sendLogin = () => {
        const reqUser = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        };
        fetch("https://tranquil-earth-85240.herokuapp.com/users/1", reqUser)
            .then((resp) => resp.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    SecureStore.setItemAsync("token", data.token)
                    navigation.navigate('HomeScreen', { user: data.user })
                }
            })
            .catch((err) => console.log(err));
    };

    sendSignup = () => {
        const reqUser = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email
            })
        }
        fetch('https://tranquil-earth-85240.herokuapp.com/users', reqUser)
            .then(resp => resp.json())
            .then(data => {
                if (data.error) {
                    console.log(data)
                } else {
                    SecureStore.setItemAsync("token", data.token)
                    navigation.navigate('HomeScreen', { user: data.user })
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <View style={styles.container}>
            {!signup ? <View>
                <Text>Not a user?</Text>
                <Button title='Sign Up' onPress={() => setSignup(true)}></Button>
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
                    title='Login'
                    onPress={sendLogin} />
            </View> : <View>
                    <Text>Already a member? </Text>
                    <Button title='Sign In' onPress={() => setSignup(false)}></Button>
                    <Text>Email:</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => onChangeEmail(text)}
                        value={email}
                        placeholder='email'
                    />
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
                        title='Sign Up'
                        onPress={sendSignup} />
                </View>}
        </View >
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
        textAlign: 'center',
        height: 50,
        borderColor: "black",
        width: 300,
        borderWidth: 1
    }
})
