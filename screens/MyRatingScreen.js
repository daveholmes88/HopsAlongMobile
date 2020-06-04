import React, { useState, useEffect } from "react";
import { View, Text, Card, Button } from 'react-native';

export default function MyRatingScreen({ navigation, route }) {
    const user = route.params.user
    const ratings = route.params.ratings
    const breweries = route.params.breweries

    const renderBreweries = () => {
        return <Card><Text>Hello World</Text></Card>
        // const myRatings = ratings.filter(rating => {
        //     return user.id === rating.user_id
        // })
        // const breweryId = myRatings.map(rating => {
        //     return rating.brewery_id
        // })
        // let myBreweries = breweries.filter(brewery => {
        //     return breweryId.includes(brewery.id)
        // })
        // // if (this.state.searchName) {
        // //     breweries = breweries.filter(brewery => {
        // //         return brewery.name.toLowerCase().includes(this.state.searchName.toLowerCase())
        // //     })
        // // }
        // return myBreweries.map(brewery => {
        //     const rating = myRatings.filter(rating => rating.brewery_id === brewery.id)
        //     const allRatings = ratings.filter(rating => rating.brewery_id === brewery.id)
        //     const allNumbers = allRatings.map(rating => rating.number)
        //     const averageRating = allNumbers.reduce((a, b) => a + b, 0) / allNumbers.length
        //     return (
        //         <Card key={brewery.id}>
        //             <Button title={`${brewery.name}`} onPress={() => console.log(brewery)} />
        //         </Card>
        //     )
        // })
    }
    return (
        <View>
            {renderBreweries()}
        </View>
    )
}