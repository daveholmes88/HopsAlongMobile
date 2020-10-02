import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, SafeAreaView, Button, TextInput } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Card } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from "expo-location";

import { config, GOOGLE_MAP_API_Key } from "../Constants";

const API_Ratings = config.url.API_Ratings
const Google_API = GOOGLE_MAP_API_Key


export default function ShowScreen({ route, navigation }) {
    const user = route.params.user
    const brewery = route.params.brewery
    const [allRatings, setAllRatings] = useState(route.params.ratings)
    const [notes, setNotes] = useState('')
    const [myNumber, setMyNumber] = useState(0)
    const [globalRating, setGlobalRating] = useState(0)
    const [myRating, setMyRating] = useState(null)
    const [location, setLocation] = useState({
        latitude: brewery.latitude,
        longitude: brewery.longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.045,
    });
    const [myLocation, setMyLocation] = useState({})
    const [directions, setDirections] = useState(false)

    useEffect(() => {
        (async () => {
            console.log('++++++++++++++++++++++')
            let { status } = await Location.requestPermissionsAsync();
            if (status === "granted") {
                let position = await Location.getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });
                setMyLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            }
        })();
        const breweryRatings = allRatings.filter(rating => {
            return rating.brewery_id === brewery.id
        })
        getGlobalRatings(breweryRatings)
        getMyInfo(breweryRatings)
    }, [])

    const getGlobalRatings = breweryRatings => {
        if (breweryRatings.length > 0) {
            const allNumbers = breweryRatings.map(rating => rating.number)
            setGlobalRating(allNumbers.reduce((a, b) => a + b, 0) / allNumbers.length)
        }
    }

    const getMyInfo = breweryRatings => {
        const myRating = breweryRatings.filter(rating => {
            return rating.user_id === user.id
        })
        if (myRating.length > 0) {
            setMyRating(myRating[0])
            setMyNumber(myRating[0].number)
            setNotes(myRating[0].notes)
        }
    }

    const handleSubmit = () => {
        if (myNumber !== 0) {
            if (myRating) {
                editRating()
            } else {
                createRating()
            }
        }
    }

    const createRating = () => {
        const createObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rating: myNumber,
                notes: notes,
                brewery_id: brewery.id,
                user_id: user.id
            })
        }
        fetch(API_Ratings, createObj)
            .then(resp => resp.json())
            .then(ratings => {
                setAllRatings(ratings)
                navigation.navigate('Rating')
            })
            .catch(err => console.log(err))
    }

    const editRating = () => {
        const updateObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rating: myRating.id,
                number: myNumber,
                notes: notes
            })
        }
        fetch(`${API_Ratings}/${myRating.id}`, updateObj)
            .then(resp => resp.json())
            .then((ratings => {
                setAllRatings(ratings)
                navigation.navigate('Rating')
            }))
            .catch(err => console.log(err))
    }

    const editBrewery = () => {
        navigation.navigate('EditScreen', { brewery: brewery })
    }

    const showDirections = () => {
        let points = [
            { latitude: brewery.latitude, longitude: brewery.longitude },
            { latitude: myLocation.latitude, longitude: myLocation.longitude }
        ]
        let minLat, maxLat, minLng, maxLng;

        (point => {
            minLat = point.latitude;
            maxLat = point.latitude;
            minLng = point.longitude;
            maxLng = point.longitude;
        })(points[0]);

        points.forEach(point => {
            minLat = Math.min(minLat, point.latitude);
            maxLat = Math.max(maxLat, point.latitude);
            minLng = Math.min(minLng, point.longitude);
            maxLng = Math.max(maxLng, point.longitude);
        });

        const midLat = (minLat + maxLat) / 2;
        const midLng = (minLng + maxLng) / 2;

        const deltaLat = (maxLat - minLat);
        const deltaLng = (maxLng - minLng);

        setLocation({
            latitude: midLat,
            longitude: midLng,
            latitudeDelta: deltaLat,
            longitudeDelta: deltaLng,
        });
        setDirections(!directions)
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Card key={brewery.id} style={styles.breweryCard} containerStyle={styles.cardBorder}>
                    <Text style={{ fontSize: 18 }} >{brewery.name}</Text>
                    <Text>{brewery.brewery_type}</Text>
                    <Text>{brewery.address} {brewery.city}, {brewery.state}, {brewery.zip}</Text>
                    <Button title={`${brewery.name}'s website`}
                        onPress={() => Linking.openURL(brewery.website)} />
                    <Text>Global Rating: {globalRating}</Text>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={myNumber}
                        selectedStar={(rating) => setMyNumber(rating)}
                    />
                    <TextInput style={styles.textInput}
                        onChangeText={text => setNotes(text)}
                        value={notes}
                    />
                    <Button title='Submit'
                        onPress={handleSubmit} />
                    {directions ? null : <Button title='Directions'
                        onPress={showDirections} />}
                    <Button title="Edit Brewery" onPress={editBrewery} />
                </Card >
            </ScrollView>
            <MapView
                showsUserLocation
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                region={location} >
                <MapView.Marker
                    key={brewery.id}
                    coordinate={{ latitude: brewery.latitude, longitude: brewery.longitude }}
                />
                {directions ? <MapViewDirections
                    origin={myLocation}
                    destination={{ latitude: brewery.latitude, longitude: brewery.longitude }}
                    apikey={Google_API}
                    strokeWidth={3}
                    strokeColor="hotpink"
                /> : null}
            </MapView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    breweryCard: {
        top: '5%',
        width: '100%',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardBorder: {
        borderWidth: 5,
        borderColor: "#FFC108",
        borderTopLeftRadius: 1,
        borderStyle: 'solid',
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    map: {
        height: '40%',
        width: '100%',
        position: 'absolute',
        top: '60%'
    },
    textInput: {
        textAlign: 'center',
        height: 40,
        borderColor: 'black',
        borderWidth: 1
    }
})