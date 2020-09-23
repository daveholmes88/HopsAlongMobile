import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView, TextInput, SafeAreaView, Button } from "react-native";
import { Card } from 'react-native-elements';
import * as Linking from 'expo-linking';

export default function BreweryCard({ brewery, showBrewery }) {

    return (<Card key={brewery.id} containerStyle={styles.cardBorder} >
        < Button title={`${brewery.name}`} onPress={() => showBrewery(brewery)} />
        <Text>{brewery.brewery_type}</Text>
        <Text>{brewery.address} {brewery.city}, {brewery.state}, {brewery.zip}</Text>
        <Button title={`${brewery.name}'s website`}
            onPress={() => Linking.openURL(brewery.website)} />
        <Text>{brewery.phone}</Text>
    </Card >
    )
}

const styles = StyleSheet.create({
    cardBorder: {
        borderWidth: 5,
        borderColor: "#FFC108",
        borderTopLeftRadius: 1,
        borderStyle: 'solid'
    }
})
