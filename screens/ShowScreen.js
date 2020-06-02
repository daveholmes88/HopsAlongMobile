import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, TextInput } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Card } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import * as SecureStore from "expo-secure-store";


export default function ShowScreen({ route, navigation }) {
    const brewery = route.params.brewery
    const [note, changeNote] = useState('')
    const [myRating, setMyRating] = useState(0)
    const [globalRating, changeGlobalRating] = useState(0)
    const [location, setLocation] = useState({
        latitude: brewery.latitude,
        longitude: brewery.longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.045,
    });

    useEffect(() => {
        const token = SecureStore.getItemAsync("token")
        if (token) {
            const reqObj = {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
            fetch('http://localhost:3000/users', reqObj)
                .then(resp => resp.json())
                .then(data => console.log(data.user))
        }
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cardContainer}>
                <Card key={brewery.id} style={styles.breweryCard}>
                    <Text>{brewery.name}</Text>
                    <Text>{brewery.brewery_type}</Text>
                    <Text>{brewery.address} {brewery.city}, {brewery.state}, {brewery.zip}</Text>
                    <Button title={`${brewery.name}'s website`}
                        onPress={() => Linking.openURL(brewery.website)} />
                    <Text>Global Rating: {globalRating}</Text>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={myRating}
                        selectedStar={(rating) => setMyRating(rating)}
                    />
                    <TextInput style={styles.textInput}
                        onChangeText={text => changeNote(text)}
                        value={note}
                    />
                </Card >
            </View>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                region={location} >
                <MapView.Marker
                    key={brewery.id}
                    coordinate={{ latitude: brewery.latitude, longitude: brewery.longitude }}
                />
            </MapView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    breweryCard: {
        width: '100%',
        position: 'absolute',
        alignItems: 'center'
    },
    cardContainer: {
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    map: {
        height: '60%',
        width: '100%',
        position: 'absolute',
        top: '40%'
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    }
})