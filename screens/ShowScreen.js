import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Card } from 'react-native-elements';

export default function ShowScreen({ route, navigation }) {

    const [location, setLocation] = useState({
        latitude: route.params.latitude,
        longitude: route.params.longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.045,
    });

    console.log(route.params)
    return (
        <SafeAreaView style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                region={location} />
            <View style={styles.cardContainer}>
                <Card key={route.params.id} style={styles.breweryCard}>
                    <Text>{route.params.name}</Text>
                    <Text>{route.params.brewery_type}</Text>
                    <Text>{route.params.address} {route.params.city}, {route.params.state}, {route.params.zip}</Text>
                    <Button title={`${route.params.name}'s website`}
                        onPress={() => Linking.openURL(route.params.website)} />
                    <Text>{route.params.phone}</Text>
                </Card >
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    breweryCard: {
        width: '100%',
        position: 'absolute'
    },
    cardContainer: {
        top: '50%'
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    map: {
        height: '50%',
        width: '100%',
        position: 'absolute'
    },
})