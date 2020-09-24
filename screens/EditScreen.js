import React, { useState, useEffect } from "react";
import { StyleSheet, Text, ScrollView, TextInput, SafeAreaView, Button } from "react-native";

import { config } from "../Constants";

const API_AdminEdits = config.url.API_AdminEdits


export default function EditScreen({ route, navigation }) {

    const brewery = route.params.brewery
    const [name, setName] = useState(`${brewery.name}`)
    const [brewery_type, setBrewery_type] = useState(`${brewery.brewery_type}`)
    const [address, setAddress] = useState(`${brewery.address}`)
    const [city, setCity] = useState(`${brewery.city}`)
    const [state, setState] = useState(`${brewery.state}`)
    const [zip, setZip] = useState(`${brewery.zip}`)
    const [country, setCountry] = useState(`${brewery.country}`)
    const [website, setWebsite] = useState(`${brewery.website}`)
    const [phone, setPhone] = useState(`${brewery.phone}`)
    const id = brewery.id

    const handleSubmit = () => {
        const createEditBrewery = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                brewery: {
                    name: name,
                    brewery_type: brewery_type,
                    address: address,
                    city: city,
                    state: state,
                    zip: zip,
                    country: country,
                    website: website,
                    phone: phone,
                    id: id
                }
            })
        }
        fetch(API_AdminEdits, createEditBrewery)
            .then(resp => resp.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }


    return (
        <SafeAreaView style={styles.container}>
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
                onChangeText={(text) => setBrewery_type(text)}
                value={brewery_type}
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
                value={zip}
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
                value={phone}
                placeholder='Phone Number'
                maxLength={10}
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
