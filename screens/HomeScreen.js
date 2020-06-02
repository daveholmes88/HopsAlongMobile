import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView, SafeAreaView, Button } from "react-native";
import { Card } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import * as Linking from 'expo-linking';

export default function HomeScreen({ navigation }) {

  const [location, setLocation] = useState({
    latitude: 37,
    longitude: -122,
    latitudeDelta: 0.09,
    longitudeDelta: 0.045,
  });
  const [breweries, setBreweries] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status === "granted") {
        let position = await Location.getCurrentPositionAsync({
          enableHighAccuracy: true,
        });
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.045,
        });
        const newLocation = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            location: [latitude, longitude]
          })
        }
        fetch('http://localhost:3000/descriptions', newLocation)
          .then(resp => resp.json())
          .then(data => setBreweries(data.breweries))
          .catch(err => console.log(err))
      } else {
        console.log("not granted");
      }
    })();
  }, []);

  const showBrewery = brewery => {
    navigation.navigate('ShowScreen', { brewery: brewery })
  }

  const renderBreweryCard = brewery => {
    return <Card key={brewery.id}>
      <Button title={`${brewery.name}`} onPress={() => showBrewery(brewery)} />
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

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={location}>
        {breweryMarkers()}
      </MapView>

      <ScrollView style={styles.breweryCard}>
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
  },
  map: {
    height: '50%',
    width: '100%',
    position: 'absolute'
  },
  breweryCard: {
    height: 500,
    width: '100%',
    top: '50%'
  }
});
