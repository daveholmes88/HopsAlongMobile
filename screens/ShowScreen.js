import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, TextInput } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Card } from 'react-native-elements';
import StarRating from 'react-native-star-rating';


export default function ShowScreen({ route, navigation }) {
    const [note, changeNote] = useState('')
    const [myRating, setMyRating] = useState(0)
    const [globalRating, changeGlobalRating] = useState(0)
    const [location, setLocation] = useState({
        latitude: route.params.latitude,
        longitude: route.params.longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.045,
    });

    console.log(myRating)
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cardContainer}>
                <Card key={route.params.id} style={styles.breweryCard}>
                    <Text>{route.params.name}</Text>
                    <Text>{route.params.brewery_type}</Text>
                    <Text>{route.params.address} {route.params.city}, {route.params.state}, {route.params.zip}</Text>
                    <Button title={`${route.params.name}'s website`}
                        onPress={() => Linking.openURL(route.params.website)} />
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
                    key={route.params.id}
                    coordinate={{ latitude: route.params.latitude, longitude: route.params.longitude }}
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