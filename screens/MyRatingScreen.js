import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView, StyleSheet, TextInput } from 'react-native';
import * as Linking from 'expo-linking';
import { Card } from 'react-native-elements';

export default function MyRatingScreen({ navigation, route }) {
    const user = route.params.user
    const ratings = route.params.ratings
    const breweries = route.params.breweries
    const [search, setSearch] = useState('')

    const showBrewery = brewery => {
        navigation.navigate('ShowScreen', { brewery: brewery })
    }

    const renderBreweries = () => {
        const myRatings = ratings.filter(rating => {
            return user.id === rating.user_id
        })
        const breweryId = myRatings.map(rating => {
            return rating.brewery_id
        })
        let myBreweries = breweries.filter(brewery => {
            return breweryId.includes(brewery.id)
        })
        if (search) {
            myBreweries = myBreweries.filter(brewery => {
                return brewery.name.toLowerCase().includes(search.toLowerCase())
            })
        }
        return myBreweries.map(brewery => {
            const rating = myRatings.filter(rating => rating.brewery_id === brewery.id)
            const allRatings = ratings.filter(rating => rating.brewery_id === brewery.id)
            const allNumbers = allRatings.map(rating => rating.number)
            const averageRating = allNumbers.reduce((a, b) => a + b, 0) / allNumbers.length
            return <Card key={brewery.id}>
                <Button title={`${brewery.name}`} onPress={() => showBrewery(brewery)} />
                <Text>{brewery.brewery_type}</Text>
                <Text>{brewery.address} {brewery.city}, {brewery.state}, {brewery.zip}</Text>
                <Button title={`${brewery.name}'s website`}
                    onPress={() => Linking.openURL(brewery.website)} />
                <Text>Global Rating: {averageRating}</Text>
                <Text>My Rating: {rating[0].number}</Text>
                <Text>{brewery.phone}</Text>
            </Card >
        })
    }
    return (
        <View style={styles.container}>
            <TextInput style={styles.textInput}
                onChangeText={text => setSearch(text)}
                value={search}
            />
            <ScrollView style={styles.breweryCard}>{renderBreweries()}</ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: 'center',
    },
    breweryCard: {
        height: 500,
        width: '100%',
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1
    }
});