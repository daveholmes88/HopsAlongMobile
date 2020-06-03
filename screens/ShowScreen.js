import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, TextInput } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Card } from 'react-native-elements';
import StarRating from 'react-native-star-rating';

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

    useEffect(() => {
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
        fetch('http://localhost:3000/ratings', createObj)
            .then(resp => resp.json())
            .then(ratings => {
                setAllRatings(ratings)
                history.push('myRatingScreen')
            })
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
        fetch(`http://localhost:3000/ratings/${myRating.id}`, updateObj)
            .then(resp => resp.json())
            .then((ratings => {
                setAllRatings(ratings)
                navigation.navigate('MyRatingScreen')
            }))
            .catch(err => console.log(err))
    }


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
                        rating={myNumber}
                        selectedStar={(rating) => setMyNumber(rating)}
                    />
                    <TextInput style={styles.textInput}
                        onChangeText={text => setNotes(text)}
                        value={notes}
                    />
                    <Button title='Submit'
                        onPress={handleSubmit} />
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