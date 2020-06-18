import React, { useState } from "react";
import { View, Text, Button, ScrollView, StyleSheet, TextInput } from 'react-native';
import { Card } from 'react-native-elements';


export default function HomeScreen({ navigation, route }) {
    const breweries = route.params.breweries
    const [search, setSearch] = useState(null)
    const [searchField, setSearchField] = useState('')
    const [filter, setFilter] = useState('')

    const handleSubmit = () => {
        setSearch(searchField.toLowerCase())
        setSearchField('')
    }

    const renderBreweries = () => {
        let searchedBreweries = breweries.filter(brewery => {
            return brewery.city.toLowerCase() === search || brewery.state.toLowerCase() === search
        })
        if (filter) {
            searchedBreweries = searchedBreweries.filter(brewery => {
                return brewery.name.toLowerCase().includes(filter.toLowerCase())
            })
        }
        return searchedBreweries.map(brewery => {
            return <Card key={brewery.id}>
                <Button title={`${brewery.name}`} onPress={() => showBrewery(brewery)} />
                <Text>{brewery.brewery_type}</Text>
                <Text>{brewery.address} {brewery.city}, {brewery.state}, {brewery.zip}</Text>
                <Button title={`${brewery.name}'s website`}
                    onPress={() => Linking.openURL(brewery.website)} />
            </Card >
        })
    }

    const showBrewery = brewery => {
        navigation.navigate('ShowScreen', { brewery: brewery })
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setSearchField(text)}
                value={searchField}
                placeholder='Search City or State'
            />
            <Button
                title='Search'
                onPress={handleSubmit} />
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setFilter(text)}
                value={filter}
                placeholder='Filter'
            />
            <ScrollView>
                {search ? renderBreweries() : null}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    textInput: {
        height: 40,
        width: '50%',
        borderColor: 'yellow',
        borderWidth: 1,
    },
})
