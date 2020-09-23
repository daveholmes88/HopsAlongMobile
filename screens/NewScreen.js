import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Button, SafeAreaView } from 'react-native';

import { config } from "../Constants";

const API_AdminNew = config.url.API_AdminNew

export default function NewScreen() {

    const [name, setName] = useState('')
    const [kind, setKind] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip_code, setZip] = useState('')
    const [country, setCountry] = useState('')
    const [website, setWebsite] = useState('')
    const [phone_number, setPhone] = useState('')

    const handleSubmit = () => {
        const newBrewery = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                kind: kind,
                address: address,
                city: city,
                state: state,
                zip_code: zip_code,
                country: country,
                website: website,
                phone_number: phone_number
            })
        }
        fetch(API_AdminNew, newBrewery)
            .then(resp => resp.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }


    return (
        <SafeAreaView style={styles.container}>
            <Text>Create a New Brewery in our Database</Text>
            <Text>Brewery Name:</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setName(text)}
                value={name}
                placeholder='Brewery Name'
            />
            <Text>Type:</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setKind(text)}
                value={kind}
                placeholder='Brewery Type'
            />
            <Text>Address:</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setAddress(text)}
                value={address}
                placeholder='Address'
            />
            <Text>City:</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setCity(text)}
                value={city}
                placeholder='City'
            />
            <Text>State:</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setState(text)}
                value={state}
                placeholder='State'
            />
            <Text>Zip:</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setZip(text)}
                value={zip_code}
                placeholder='Zip Code'
            />
            <Text>Country:</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setCountry(text)}
                value={country}
                placeholder='Country'
            />
            <Text>Website:</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setWebsite(text)}
                value={website}
                placeholder='Website'
            />
            <Text>Phone Number:</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setPhone(text)}
                value={phone_number}
                placeholder='Phone Number'
            />
            <Button title='Submit' onPress={handleSubmit} />
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    textInput: {
        textAlign: 'center',
        height: 40,
        width: '100%',
        borderColor: '#FFC108',
        borderWidth: 1,
    },
    cardBorder: {
        borderWidth: 5,
        borderColor: "#FFC108",
        borderTopLeftRadius: 1,
        borderStyle: 'solid'
    },
})