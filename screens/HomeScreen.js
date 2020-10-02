import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView, TextInput, SafeAreaView, Button } from "react-native";
import { Card } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

import BreweryCard from './BreweryCard'

import { config } from "../Constants";

const API_Descriptions = config.url.API_Descriptions

export default function HomeScreen({ navigation, route }) {
  ratings = route.params.ratings
  const [location, setLocation] = useState({
    latitude: 37,
    longitude: -122,
    latitudeDelta: 0.09,
    longitudeDelta: 0.045,
  });
  const [searchLocation, setSearchLocation] = useState('')
  const [breweries, setBreweries] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status === "granted") {
        let position = await Location.getCurrentPositionAsync({
          enableHighAccuracy: true,
        });
        const newLocation = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            location: [position.coords.latitude, position.coords.longitude]
          })
        }
        locationFetch(newLocation)
      } else {
        console.log("not granted");
      }
    })();
  }, []);

  const locationFetch = newLocation => {
    fetch(API_Descriptions, newLocation)
      .then(resp => resp.json())
      .then(data => {
        setBreweries(data.breweries)
        setLocation({
          latitude: data.location[0],
          longitude: data.location[1],
          latitudeDelta: 0.09,
          longitudeDelta: 0.045,
        });
        setSearchLocation('')
      })
      .catch(err => console.log(err))
  }

  const showBrewery = brewery => {
    navigation.navigate('ShowScreen', { brewery: brewery })
  }

  const renderBreweryCard = brewery => {
    return <Card key={brewery.id} containerStyle={styles.cardBorder} >
      < Button title={`${brewery.name}`} onPress={() => showBrewery(brewery)} />
      <Text>{brewery.brewery_type}</Text>
      <Text>{brewery.address} {brewery.city}, {brewery.state}, {brewery.zip}</Text>
      <Button title={`${brewery.name}'s website`}
        onPress={() => Linking.openURL(brewery.website)} />
      <Text>{brewery.phone}</Text>
    </Card >
  }

  const breweryMarkers = () => {
    return breweries.map(brewery => {
      return <MapView.Marker
        key={brewery.id}
        coordinate={{ latitude: brewery.latitude, longitude: brewery.longitude }}
      />
    })
  }

  onSearch = () => {
    const newLocation = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        location: searchLocation
      })
    }
    locationFetch(newLocation)
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setSearchLocation(text)}
        value={searchLocation}
        placeholder='Location' />
      <Button
        title='Search'
        onPress={onSearch}
      />
      <MapView
        showsUserLocation
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={location}>
        {breweryMarkers()}
      </MapView>
      <ScrollView>
        {breweries.map(brewery => renderBreweryCard(brewery))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: 'center',
  },
  map: {
    height: '40%',
    width: '100%',
  },
  cardBorder: {
    borderWidth: 5,
    borderColor: "#FFC108",
    borderTopLeftRadius: 1,
    borderStyle: 'solid',
  },
  textInput: {
    textAlign: 'center',
    height: 50,
    borderColor: "black",
    width: '70%',
    borderWidth: 1,
  }
});

